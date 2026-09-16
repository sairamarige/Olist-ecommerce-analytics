import pandas as pd

# Loading Datasets
orders=pd.read_csv("olist_orders_dataset.csv")
order_items=pd.read_csv("olist_order_items_dataset.csv")
products=pd.read_csv("olist_products_dataset.csv")
customers=pd.read_csv("olist_customers_dataset.csv")
category_translation=pd.read_csv("product_category_name_translation.csv")

# Initial Dataset Information
print("Orders:", orders.shape)
print("Order Items:", order_items.shape)
print("Customers:", customers.shape)
print("Products:", products.shape)
print("Category Translation:", category_translation.shape)

print(orders.columns.tolist())
print(order_items.columns.tolist())
print(customers.columns.tolist())
print(products.columns.tolist())
print(category_translation.columns.tolist())

print(customers.dtypes)
print(orders.dtypes)
print(order_items.dtypes)
print(category_translation.dtypes)
print(products.dtypes)

# Missing Values
def missing_values(df, name):
    print(f"\n{name} missing values:")
    print(df.isnull().sum())
missing_values(orders, "Orders")
missing_values(order_items, "Order Items")
missing_values(customers, "Customers")
missing_values(products, "Products")
missing_values(category_translation, "Category Translation")

print(orders.isnull().sum())
print(order_items.isnull().sum())
print(customers.isnull().sum())
print(products.isnull().sum())

# Duplicate checks
print(orders["order_id"].duplicated().sum())
print(customers["customer_id"].duplicated().sum())
print(products["product_id"].duplicated().sum())
print(order_items.duplicated(subset=["order_id","order_item_id"]).sum())

# order Status
print(orders["order_status"].value_counts())

# Remove Cancelled Orders
orders=orders[orders["order_status"]!="canceled"].copy()
print(orders.shape)

# converting to Date columns
date_columns=["order_purchase_timestamp",
              "order_approved_at",
              "order_delivered_carrier_date",
              "order_delivered_customer_date",
              "order_estimated_delivery_date"]
for column in date_columns:
    orders[column]=pd.to_datetime(orders[column],errors="coerce")
order_items["shipping_limit_date"]=pd.to_datetime(
    order_items["shipping_limit_date"],errors="coerce")



# Convert Price and freight to numeric datatype
order_items["price"]=pd.to_numeric(order_items["price"],errors="coerce")

order_items["freight_value"]=pd.to_numeric(order_items["freight_value"],errors="coerce")



# Merge Orders + Customers
merged_data=orders.merge(customers,on="customer_id",how="left")

# Merge Order Items
merged_data=merged_data.merge(order_items,on="order_id",how="left")

# Merge  Products
merged_data=merged_data.merge(products,on="product_id",how="left")

# Merge Category Translation
merged_data=merged_data.merge(category_translation,on="product_category_name",how="left")


# Revenue
merged_data["revenue"]=(merged_data["price"]+merged_data["freight_value"])

# Delivery days
merged_data["delivery_days"]=(merged_data["order_delivered_customer_date"]-merged_data["order_purchase_timestamp"]).dt.days


# Late Flag
merged_data["late_flag"] = pd.NA

delivered_mask = (merged_data["order_delivered_customer_date"].notna()
    & merged_data["order_estimated_delivery_date"].notna())

merged_data.loc[delivered_mask, "late_flag"] = (
    merged_data.loc[delivered_mask,"order_delivered_customer_date"]
    >merged_data.loc[delivered_mask,"order_estimated_delivery_date"]).astype(int)

# merged_data["order_month"] = (merged_data["order_purchase_timestamp"]
#     .dt.to_period("M").astype(str))
# Create Month Number
merged_data["month_number"] = (
    merged_data["order_purchase_timestamp"].dt.month
)

# Create Month Name
merged_data["month_name"] = (
    merged_data["order_purchase_timestamp"].dt.month_name())
merged_data["order_month"] = (
    merged_data["order_purchase_timestamp"].dt.strftime("%Y-%m")
)

print(merged_data.shape)
print(merged_data.columns.tolist())
print(merged_data[["revenue","delivery_days",
            "late_flag","order_month"]].head(10))
merged_data.to_csv("ecommerce_clean.csv",index=False)
print("Cleaning completed successfully!")


print("Final columns:", len(merged_data.columns))
print(merged_data["order_status"].value_counts())
print(merged_data.isnull().sum().sort_values(ascending=False))
print(merged_data["revenue"].describe())
print(merged_data["delivery_days"].describe())
print(merged_data["late_flag"].value_counts(dropna=False))
print(merged_data["order_month"].min(), "to", merged_data["order_month"].max())