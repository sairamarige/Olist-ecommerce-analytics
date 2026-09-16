OLIST E-COMMERCE ANALYTICS
===========================

End-to-end E-Commerce Sales Analytics project using Python, MySQL, Excel,
Power BI, FastAPI, and React.

PROJECT OVERVIEW
----------------

This project analyzes Brazilian e-commerce sales data from the Olist
E-Commerce dataset.

The project follows an end-to-end analytics workflow:

Raw Data
    ↓
Python & Pandas Data Cleaning
    ↓
Cleaned Analytical Dataset
    ↓
MySQL Business Analysis
    ↓
Excel Reporting
    ↓
Power BI Dashboard
    ↓
FastAPI Backend
    ↓
React Analytics Website
    ↓
Business Insights & Recommendations


PROJECT OBJECTIVE
-----------------

The objective is to transform raw e-commerce data into a reliable
analytical dataset and use multiple analytics and visualization tools
to identify sales performance, customer value, regional performance,
and delivery patterns.


KEY BUSINESS METRICS
--------------------

Total Revenue              : 15,737,667.52
Total Orders               : 98,816
Average Order Value        : 159.26
Late Delivery Rate         : 7.92%
Average Delivery Time      : 12.01 Days


DATA PREPARATION
----------------

Python and Pandas were used for data preparation.

Main datasets used:

- Orders
- Order Items
- Customers
- Products
- Product Category Translation

Major preparation steps:

- Loaded and inspected the source datasets
- Checked dataset dimensions and columns
- Checked missing values
- Checked duplicate records
- Reviewed order status distribution
- Excluded cancelled orders from the main analysis
- Converted date columns to datetime format
- Converted price and freight values to numeric format
- Merged orders, customers, order items, products, and category translation
- Created revenue
- Created delivery_days
- Created late_flag
- Created order_month
- Created month_number
- Created month_name
- Validated the final analytical dataset
- Exported the cleaned dataset as ecommerce_clean.csv


FEATURE ENGINEERING
-------------------

Revenue:

Revenue = Price + Freight Value


Delivery Days:

Delivery Days = Delivered Date - Purchase Date


Late Delivery Flag:

1 = Delivered after estimated delivery date
0 = Delivered on or before estimated delivery date


SQL ANALYSIS
------------

MySQL was used to perform business analysis on the cleaned dataset.

Analysis includes:

- Total revenue
- Total orders
- Average order value
- Revenue by product category
- Revenue by customer state
- Monthly revenue
- Top customers
- Order status analysis
- Average delivery time
- Late delivery analysis
- Late delivery by state
- High-value customer analysis
- Data quality checks


EXCEL REPORTING
---------------

Excel was used to create structured reporting outputs.

The Excel analysis includes:

- KPI Summary
- Revenue by Category
- Revenue by State
- Monthly Revenue
- Top 10 Customers
- Revenue trend visualization
- Customer revenue visualization
- Clean analytical data


POWER BI DASHBOARD
------------------

The Power BI report contains four analytical pages:

1. Executive Overview
2. Sales Insights
3. Delivery Performance
4. Delivery Risk Analysis

Key dashboard metrics include:

- Total Revenue
- Total Orders
- Average Order Value
- Late Delivery Percentage
- Average Delivery Days

The dashboard provides interactive analysis of sales and delivery
performance.


WEB APPLICATION
---------------

A modern analytics website was developed using React and FastAPI.

Frontend:

- React
- Vite
- Recharts
- Axios
- CSS

Backend:

- FastAPI
- Uvicorn
- Pandas

The website provides:

- Executive Dashboard
- Sales Analytics
- Delivery Analytics
- Business Insights
- Data & Methodology

The FastAPI backend reads the cleaned analytical dataset and provides
business metrics and chart data through API endpoints.


WEBSITE ANALYTICS
-----------------

Dashboard:

- Revenue KPI
- Order KPI
- Average Order Value
- Late Delivery Rate
- Average Delivery Time
- Monthly Revenue Trend
- Business Performance Summary

Sales Analytics:

- Revenue by Product Category
- Revenue by State
- Top Customers

Delivery Analytics:

- Late Delivery Percentage by State
- Top States by Late Orders
- Delivery performance indicators

Business Insights:

- Executive snapshot
- Key business insights
- Business recommendations
- Management priorities
- Analyst takeaway

Data & Methodology:

- Dataset overview
- Data preparation
- Analytical decisions
- Calculated metrics
- Analytical workflow
- Project architecture
- Technology stack


PROJECT STRUCTURE
-----------------

Olist-ecommerce-analytics/

├── backend/
│   ├── main.py
│   └── ecommerce_clean.csv
│
├── docs/
│   ├── cleaning_log.xlsx
│   └── Olist_Ecommerce_Final_Business_Report.docx
│
├── excel/
│   └── Olist_Ecommerce_Sales_Report.xlsx
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── PowerBi/
│   ├── Ecommerce Dashboard.pbix
│   └── Ecommerce_Dashboard_Screenshots.pdf
│
├── python/
│   └── cleaning.py
│
├── SQL/
│   ├── sql queries.sql
│   └── Olist_Part_B_MySQL_Analysis.docx
│
├── .gitignore
├── requirements.txt
└── README.txt


TECHNOLOGY STACK
----------------

Python        - Data cleaning and preparation
Pandas        - Data transformation and analysis
MySQL        - Business analysis
Excel        - Reporting and analysis
Power BI     - Interactive BI dashboards
FastAPI      - Backend API
React        - Frontend application
Vite         - Frontend development environment
Recharts     - Interactive charts
Axios        - API communication


BUSINESS INSIGHTS
-----------------

The analysis shows strong revenue concentration across leading product
categories and regional markets.

Key observations include:

- Total analyzed revenue is approximately 15.74 million.
- The dataset contains 98,816 unique orders after the defined cleaning
  process.
- Average order value is 159.26.
- The overall late delivery rate is 7.92%.
- Average delivery time is approximately 12.01 days.
- Product category and regional analysis show that revenue is
  concentrated in leading markets.
- Delivery performance varies across states and requires regional
  monitoring.


BUSINESS RECOMMENDATIONS
------------------------

- Protect and expand strong revenue-generating product categories.
- Maintain strong regional markets while identifying opportunities in
  other regions.
- Monitor states with higher late-order volumes.
- Investigate fulfillment and carrier performance in higher-risk
  regions.
- Analyze repeat purchasing behavior and customer retention.
- Monitor high-value customer segments for future growth opportunities.


ANALYTICAL WORKFLOW
-------------------

1. Collect
   Load the Olist source datasets.

2. Clean
   Handle missing values, duplicates, data types, and cancelled orders.

3. Transform
   Merge datasets and create analytical metrics.

4. Analyze
   Perform business analysis using MySQL and Python.

5. Visualize
   Build Excel, Power BI, and React visualizations.

6. Recommend
   Convert analytical findings into business recommendations.


REPOSITORY NOTES
----------------

The repository intentionally excludes development environments and
generated dependency folders such as:

- venv/
- node_modules/
- .env
- Python cache files
- Vite build files
- log files

Python dependencies are listed in requirements.txt.

Frontend dependencies are defined in frontend/package.json.


PROJECT PURPOSE
---------------

This project demonstrates an end-to-end Data Analytics workflow,
combining data preparation, SQL analysis, spreadsheet reporting,
business intelligence, API development, and frontend visualization
into one complete portfolio project.