import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler, PowerTransformer, PolynomialFeatures
from sklearn.ensemble import RandomForestRegressor, StackingRegressor
from xgboost import XGBRegressor
from sklearn.linear_model import Ridge
from sklearn.neural_network import MLPRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import joblib

# Load the generated dataset
df = pd.read_csv("crop_data.csv")

# Encode categorical features
label_encoders = {}
categorical_cols = ["crop_name", "region", "season", "soil_type", "weather_condition"]
for col in categorical_cols:
    label_encoders[col] = LabelEncoder()
    df[col] = label_encoders[col].fit_transform(df[col])

# Identify numerical columns
numeric_cols = df.select_dtypes(include=[np.number]).columns

# Remove outliers using IQR method
Q1 = df[numeric_cols].quantile(0.25)
Q3 = df[numeric_cols].quantile(0.75)
IQR = Q3 - Q1
filtered_df = df[~((df[numeric_cols] < (Q1 - 1.5 * IQR)) | (df[numeric_cols] > (Q3 + 1.5 * IQR))).any(axis=1)]

# Feature Selection: Keep most correlated features
corr_matrix = filtered_df.corr()
important_features = corr_matrix["crop_price"].abs().sort_values(ascending=False).index[1:20]  # Select top 20 features

# Define input and output variables
X = filtered_df[important_features]
y = filtered_df["crop_price"]

# Log transform target variable to normalize distribution
y = np.log1p(y)

# Feature engineering: Polynomial features
poly = PolynomialFeatures(degree=2, interaction_only=True, include_bias=False)
X_poly = poly.fit_transform(X)

# Feature scaling
scaler = StandardScaler()
power_transformer = PowerTransformer()
X_scaled = scaler.fit_transform(X_poly)
X_scaled = power_transformer.fit_transform(X_scaled)

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

# Define base models
rf_model = RandomForestRegressor(n_estimators=500, max_depth=20, random_state=42)
xgb_model = XGBRegressor(n_estimators=800, learning_rate=0.02, max_depth=10, random_state=42)
nn_model = MLPRegressor(hidden_layer_sizes=(100, 50), activation='relu', solver='adam', max_iter=500, random_state=42)

# Define stacking model
stacking_model = StackingRegressor(
    estimators=[("rf", rf_model), ("xgb", xgb_model), ("nn", nn_model)],
    final_estimator=Ridge()
)

# Train the stacking model
stacking_model.fit(X_train, y_train)

# Make predictions
y_pred = stacking_model.predict(X_test)

# Convert predictions back to original scale
y_pred = np.expm1(y_pred)
y_test = np.expm1(y_test)

# Evaluate model performance
mae = mean_absolute_error(y_test, y_pred)
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

# Print evaluation metrics
print(f"Mean Absolute Error: {mae}")
print(f"Mean Squared Error: {mse}")
print(f"R-squared Score: {r2}")

# Save the trained model and transformations
joblib.dump(stacking_model, "optimized_stacking_model.pkl")
joblib.dump(scaler, "scaler.pkl")
joblib.dump(power_transformer, "power_transformer.pkl")
joblib.dump(poly, "poly.pkl")

print("Optimized stacking model saved as optimized_stacking_model.pkl")

