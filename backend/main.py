from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

app = FastAPI(title="Olist E-Commerce Analytics API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Load cleaned dataset
df = pd.read_csv("ecommerce_clean.csv")


@app.get("/")
def home():
    return {
        "message": "Olist Analytics API is running"
    }


@app.get("/api/kpis")
def get_kpis():

    total_revenue = df["revenue"].sum()

    total_orders = df["order_id"].nunique()


    aov = (
        total_revenue / total_orders
        if total_orders > 0
        else 0
    )


 

    late_orders = df.loc[
        df["late_flag"] == 1,
        "order_id"
    ].nunique()

    late_delivery_percentage = (
        late_orders / total_orders * 100
        if total_orders > 0
        else 0
    )
    average_delivery_days = df["delivery_days"].mean()

    return {
        "total_revenue": round(total_revenue, 2),
        "total_orders": total_orders,
        "aov": round(aov, 2),
        "late_delivery_percentage": round(
            late_delivery_percentage, 2),
        "average_delivery_days": round(average_delivery_days, 2)
    }
@app.get("/api/monthly-revenue")
def get_monthly_revenue():

    monthly_data = (
        df.groupby("order_month", as_index=False)["revenue"]
        .sum()
        .sort_values("order_month")
    )

    monthly_data["revenue"] = monthly_data["revenue"].round(2)

    return monthly_data.to_dict(orient="records")
@app.get("/api/sales-summary")
def get_sales_summary():

    category_data = (
        df.groupby("product_category_name_english")["revenue"]
        .sum()
        .sort_values(ascending=False)
        .head(10)
        .round(2)
    )

    state_data = (
        df.groupby("customer_state")["revenue"]
        .sum()
        .sort_values(ascending=False)
        .head(10)
        .round(2)
    )

    customer_data = (
        df.groupby("customer_unique_id")["revenue"]
        .sum()
        .sort_values(ascending=False)
        .head(10)
        .round(2)
    )

    return {
        "category_revenue": [
            {
                "category": index,
                "revenue": value
            }
            for index, value in category_data.items()
        ],

        "state_revenue": [
            {
                "state": index,
                "revenue": value
            }
            for index, value in state_data.items()
        ],

        "top_customers": [
            {
                "customer": index,
                "revenue": value
            }
            for index, value in customer_data.items()
        ]
    }
@app.get("/api/delivery-summary")
def get_delivery_summary():

    delivery_df = df[df["late_flag"].isin([0, 1])].copy()

    state_delivery = (
        delivery_df.groupby("customer_state")
        .agg(
            total_orders=("order_id", "nunique"),
            late_orders=("late_flag", "sum"),
            average_delivery_days=("delivery_days", "mean")
        )
        .reset_index()
    )

    state_delivery["late_delivery_percentage"] = (
        state_delivery["late_orders"]
        / state_delivery["total_orders"]
        * 100
    )

    state_delivery["average_delivery_days"] = (
        state_delivery["average_delivery_days"].round(2)
    )

    state_delivery["late_delivery_percentage"] = (
        state_delivery["late_delivery_percentage"].round(2)
    )

    late_states = (
        state_delivery
        .sort_values("late_orders", ascending=False)
        .head(10)
    )

    return {
        "state_delivery": state_delivery.to_dict(orient="records"),
        "top_late_states": late_states.to_dict(orient="records")

    }
@app.get("/api/methodology")
def get_methodology():

    return {
        "rows": len(df),
        "columns": len(df.columns),
        "orders": df["order_id"].nunique(),
        "customers": df["customer_unique_id"].nunique(),
        "products": df["product_id"].nunique(),
        "date_start": df["order_purchase_timestamp"].min(),
        "date_end": df["order_purchase_timestamp"].max(),
        "delivered_orders": df.loc[
            df["order_status"] == "delivered",
            "order_id"
        ].nunique(),
        "late_orders": df.loc[
            df["late_flag"] == 1,
            "order_id"
        ].nunique()
    }






