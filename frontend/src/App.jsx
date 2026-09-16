import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
const fmtDays = (value) => (value ?? 0).toFixed(2);


function App() {

  const [kpis, setKpis] = useState(null);

  const [monthlyRevenue, setMonthlyRevenue] = useState([]);

  const [salesSummary, setSalesSummary] = useState(null);

  const [deliverySummary, setDeliverySummary] = useState(null);

  const [methodology, setMethodology] = useState(null);

  const [activePage, setActivePage] = useState("Dashboard");

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [error, setError] = useState(false);

  const menuItems = [
    { name: "Home", icon: "⌂" },
    { name: "Dashboard", icon: "▣" },
    { name: "Sales Analytics", icon: "▥" },
    { name: "Delivery Analytics", icon: "◉" },
    { name: "Business Insights", icon: "◆" },
    { name: "Data & Methodology", icon: "▤" },
  ];

  /* =========================
     API DATA
  ========================= */

  useEffect(() => {

    fetch("http://127.0.0.1:8000/api/kpis")
      .then((response) => {

        if (!response.ok) {
          throw new Error("KPI API request failed");
        }

        return response.json();

      })
      .then((data) => {

        setKpis(data);

      })
      .catch((error) => {

        console.error("KPI API Error:", error);

        setError(true);

      });


    fetch("http://127.0.0.1:8000/api/monthly-revenue")
      .then((response) => {

        if (!response.ok) {
          throw new Error("Monthly revenue API request failed");
        }

        return response.json();

      })
      .then((data) => {

        setMonthlyRevenue(data);

      })
      .catch((error) => {

        console.error("Monthly Revenue API Error:", error);

      });


    fetch("http://127.0.0.1:8000/api/sales-summary")
      .then((response) => {

        if (!response.ok) {
          throw new Error("Sales Summary API request failed");
        }

        return response.json();

      })
      .then((data) => {

        setSalesSummary(data);

      })
      .catch((error) => {

        console.error("Sales Summary API Error:", error);

      });
    fetch("http://127.0.0.1:8000/api/delivery-summary")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Delivery Summary API request failed");
        }

        return response.json();
      })
      .then((data) => {
        setDeliverySummary(data);
      })
      .catch((error) => {
        console.error("Delivery Summary API Error:", error);
      });
    fetch("http://127.0.0.1:8000/api/methodology")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Methodology API request failed");
        }
        return response.json();
      })
      .then((data) => setMethodology(data))
      .catch((error) => {
        console.error("Methodology API Error:", error);
      });

  }, []);


  /* =========================
     LOADING / ERROR
  ========================= */

  if (error) {
    return (
      <div className="loading-screen">
        <div className="loading-card error-card">
          <div className="error-icon">!</div>

          <h2>Unable to load analytics</h2>

          <p>
            The analytics API could not be reached.
            Please make sure the FastAPI backend is running.
          </p>

          <button
            className="primary-button"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }


  if (!kpis) {
    return (
      <div className="loading-screen">
        <div className="loading-card">
          <div className="loading-spinner"></div>

          <h2>Loading analytics</h2>

          <p>
            Preparing the Olist e-commerce insights dashboard...
          </p>
        </div>
      </div>
    );
  }
  /* =========================
   HOME PAGE
  ========================= */

  const HomePage = () => {

    const topCategory =
      salesSummary?.category_revenue?.[0]?.category
        ? salesSummary.category_revenue[0].category
          .replace(/_/g, " ")
          .replace(/\b\w/g, char => char.toUpperCase())
        : "Loading...";

    const topState =
      salesSummary?.state_revenue?.[0]?.state || "Loading...";

    return (

      <>

        {/* =========================
           HERO
        ========================= */}

        <section className="home-hero">

          <div className="home-hero-content">

            <span className="section-kicker">
              E-commerce ANALYTICS PROJECT
            </span>

            <h1>
              Turning E-Commerce Data Into Business Decisions
            </h1>

            <p>
              An end-to-end analytics project that transforms raw Olist
              e-commerce data into validated metrics, interactive
              dashboards, and actionable business insights.
            </p>
            <div className="hero-tags">
              <span>98.8K Orders</span>
              <span>$15.74M Revenue</span>
              <span>7.92% Late Delivery</span>
            </div>

            <div className="home-actions">

              <button
                type="button"
                className="primary-button"
                onClick={() => setActivePage("Dashboard")}
              >
                View Dashboard →
              </button>

              <button
                type="button"
                className="secondary-button"
                onClick={() => setActivePage("Data & Methodology")}
              >
                View Methodology
              </button>

            </div>

          </div>


          <div className="home-hero-card">
            <div className="hero-card-header">

              <div>
                <span>
                  PROJECT SNAPSHOT
                </span>

                <h2>
                  Olist E-Commerce Analytics
                </h2>
              </div>

              <span className="hero-status">
                ● ANALYZED
              </span>

            </div>

            <p>
              A complete analytics workflow from raw data preparation
              to business decision-making.
            </p>




            <div className="hero-metrics">
              <div className="hero-metric">
                <strong>
                  ${((kpis?.total_revenue || 0) / 1000000).toFixed(2)}M
                </strong>
                <span>Total Revenue</span>
              </div>

              <div className="hero-metric">
                <strong>
                  {(kpis?.total_orders || 0).toLocaleString()}
                </strong>
                <span>Total Orders</span>
              </div>

              <div className="hero-metric">
                <strong>
                  {(kpis?.late_delivery_percentage || 0).toFixed(2)}%
                </strong>
                <span>Late Delivery</span>
              </div>

              <div className="hero-metric">
                <strong>
                  {fmtDays(kpis?.average_delivery_days)} Days
                </strong>
                <span>Avg. Delivery</span>
              </div>
            </div>

          </div>

        </section>


        {/* =========================
           PROJECT OVERVIEW
        ========================= */}

        <section className="content-card">

          <div className="card-header">

            <div>

              <span className="section-kicker">
                PROJECT OVERVIEW
              </span>

              <h2>
                How This Project Works
              </h2>

              <p>
                A structured workflow that turns raw e-commerce data into
                validated analysis, clear visualizations, and actionable
                business insights.
              </p>

            </div>

          </div>


          <div className="workflow-grid">

            <div>

              <span>01</span>

              <strong>
                Clean
              </strong>

              <p>
                Clean, validate, and prepare raw e-commerce data for analysis.
              </p>

            </div>


            <div>

              <span>02</span>

              <strong>
                Analyze
              </strong>

              <p>
                Calculate KPIs and identify sales, customer, and delivery patterns.              </p>

            </div>


            <div>

              <span>03</span>

              <strong>
                Visualize
              </strong>

              <p>
                Turn analytical results into clear dashboards and visual reports.
              </p>

            </div>


            <div>

              <span>04</span>

              <strong>
                Explain
              </strong>

              <p>
                Connect the numbers to meaningful questions and findings.             </p>

            </div>


            <div>

              <span>05</span>

              <strong>
                Recommend
              </strong>

              <p>
                Identify practical opportunities to improve sales and operations.
              </p>

            </div>


            <div>

              <span>06</span>

              <strong>
                Deliver
              </strong>

              <p>
                Deliver the complete analysis through an interactive analytics application.
              </p>

            </div>

          </div>

        </section>
        {/* =========================
          EXPLORE THE ANALYSIS
        ========================= */}

        <section className="content-card">

          <div className="card-header">

            <div>

              <span className="section-kicker">
                EXPLORE THE ANALYSIS
              </span>

              <h2>
                What can you explore?
              </h2>

              <p>
                Explore the project from different business perspectives,
                from sales performance to delivery risk and final recommendations.
              </p>

            </div>

          </div>


          <div className="explore-grid">

            <div className="explore-card">

              <span className="explore-number">
                01
              </span>

              <h3>
                Sales Analytics
              </h3>

              <p>
                Analyze revenue trends, categories, states, and customer performance.
              </p>

              <button
                type="button"
                className="text-button"
                onClick={() => setActivePage("Sales Analytics")}
              >
                Explore Sales →
              </button>

            </div>


            <div className="explore-card">

              <span className="explore-number">
                02
              </span>

              <h3>
                Delivery Analytics
              </h3>

              <p>
                Understand delivery performance, delays, and regional logistics risk.
              </p>

              <button
                type="button"
                className="text-button"
                onClick={() => setActivePage("Delivery Analytics")}
              >
                Explore Delivery →
              </button>

            </div>


            <div className="explore-card">

              <span className="explore-number">
                03
              </span>

              <h3>
                Business Insights
              </h3>

              <p>
                Turn analytical findings into practical business recommendations.
              </p>

              <button
                type="button"
                className="text-button"
                onClick={() => setActivePage("Business Insights")}
              >
                View Insights →
              </button>

            </div>

          </div>

        </section>

        {/* =========================
           CALL TO ACTION
        ========================= */}

        <section className="content-card home-cta">

          <div>

            <span className="section-kicker">
              EXPLORE THE PROJECT
            </span>

            <h2>
              See the analysis behind the numbers
            </h2>

            <p>
              Explore the dashboard, sales performance, delivery
              analytics, business insights, and methodology used
              throughout the project.
            </p>

          </div>

          <button
            type="button"
            className="primary-button"
            onClick={() => setActivePage("Dashboard")}
          >
            Explore Analytics →
          </button>

        </section>

      </>

    );

  };

  /* =========================
   DASHBOARD PAGE
  ========================= */

  const DashboardPage = () => {

    const topCategory =
      salesSummary?.category_revenue?.[0]?.category
        ? salesSummary.category_revenue[0].category
          .replace(/_/g, " ")
          .replace(/\b\w/g, char => char.toUpperCase())
        : "Loading...";

    const topState =
      salesSummary?.state_revenue?.[0]?.state || "Loading...";


    return (


      <>

        {/* =========================
         HEADER
      ========================= */}

        <header className="header">

          <div>

            <p className="eyebrow">
              E-COMMERCE ANALYTICS
            </p>

            <h1>
              E-Commerce Sales Overview
            </h1>

            <p className="subtitle">
              Monitor revenue, orders, customer value, and delivery performance.
            </p>

          </div>

          <div className="header-badge">
            ● Olist E-Commerce Analytics
          </div>

        </header>


        {/* =========================
         KPI CARDS
      ========================= */}

        <section className="kpi-grid">


          {/* REVENUE */}

          <div className="kpi-card">

            <div className="kpi-top">

              <div className="icon-box">
                $
              </div>

              <span className="kpi-label">
                REVENUE
              </span>

            </div>

            <h2>
              ${(kpis.total_revenue / 1000000).toFixed(2)}M
            </h2>

            <p>
              Total Revenue
            </p>

          </div>


          {/* ORDERS */}

          <div className="kpi-card">

            <div className="kpi-top">

              <div className="icon-box">
                🛒
              </div>

              <span className="kpi-label">
                ORDERS
              </span>

            </div>

            <h2>
              {kpis.total_orders.toLocaleString()}
            </h2>

            <p>
              Total Orders
            </p>

          </div>


          {/* AOV */}

          <div className="kpi-card">

            <div className="kpi-top">

              <div className="icon-box">
                ↗
              </div>

              <span className="kpi-label">
                AOV
              </span>

            </div>

            <h2>
              ${kpis.aov.toFixed(2)}
            </h2>

            <p>
              Average Order Value
            </p>

          </div>


          {/* DELIVERY */}

          <div className="kpi-card">

            <div className="kpi-top">

              <div className="icon-box">
                🚚
              </div>

              <span className="kpi-label">
                DELIVERY
              </span>

            </div>

            <h2>
              {kpis.late_delivery_percentage.toFixed(2)}%
            </h2>

            <p>
              Late Delivery Rate
            </p>

          </div>
          {/* AVERAGE DELIVERY */}

          <div className="kpi-card">

            <div className="kpi-top">

              <div className="icon-box">
                ⏱
              </div>

              <span className="kpi-label">
                DELIVERY TIME
              </span>

            </div>

            <h2>
              {fmtDays(kpis.average_delivery_days)} Days
            </h2>

            <p>
              Average Delivery Time
            </p>

          </div>

        </section>
        <p className="dashboard-note">
          Key performance indicators across the analyzed Olist e-commerce dataset.
        </p>


        {
          /* =========================
             MONTHLY REVENUE
          ========================= */
        }

        <section className="content-card">

          <div className="card-header">
            <div>
              <span className="section-kicker">REVENUE PERFORMANCE</span>
              <h2>Revenue Trend</h2>
              <p>Track how revenue changed over time and identify periods of growth and decline.</p>
            </div>
          </div>


          <div className="chart-container revenue-chart">

            <ResponsiveContainer
              width="100%"
              height={380}
            >

              <LineChart
                data={monthlyRevenue}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 20,
                }}
              >

                <CartesianGrid
                  strokeDasharray="4 4"
                  vertical={false}
                />

                <XAxis
                  dataKey="order_month"
                />


                <YAxis
                  tickFormatter={(value) =>
                    `$${(value / 1000).toFixed(0)}K`
                  }
                />

                <Tooltip
                  formatter={(value) =>
                    `$${Number(value).toLocaleString()}`
                  }
                />

                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 7 }}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </section>
        {
          /* =========================
           DASHBOARD SUMMARY
          ========================= */
        }

        <section className="content-card dashboard-summary">

          <div className="card-header">

            <div>

              <span className="section-kicker">
                PERFORMANCE SUMMARY
              </span>

              <h2>
                What the numbers show
              </h2>

              <p>
                A quick interpretation of the core business performance indicators.
              </p>

            </div>

          </div>


          <div className="dashboard-summary-grid">

            <div>

              <strong>
                {topCategory}
              </strong>

              <span>
                Leading revenue category
              </span>

            </div>


            <div>

              <strong>
                {topState}
              </strong>

              <span>
                Highest revenue state
              </span>

            </div>


            <div>

              <strong>
                {kpis.late_delivery_percentage.toFixed(2)}%
              </strong>

              <span>
                Orders delivered later than estimated
              </span>

            </div>

          </div>

        </section>


      </>

    );

  };

  /* =========================
     SALES ANALYTICS PAGE
  ========================= */

  const SalesAnalyticsPage = () => (

    <>

      {/* =========================
       HEADER
      ========================= */}

      <header className="header">

        <div>

          <p className="eyebrow">
            SALES PERFORMANCE
          </p>

          <h1>
            Sales Analytics
          </h1>

          <p className="subtitle">
            Understand where revenue comes from, which markets perform best,
            and where customer value is concentrated.
          </p>

        </div>

        <div className="header-badge">
          ● SALES PERFORMANCE
        </div>

      </header>


      {/* =========================
       SALES KPIs
      ========================= */}

      <section className="kpi-grid">

        <div className="kpi-card">

          <div className="kpi-top">

            <div className="icon-box">
              $
            </div>

            <span className="kpi-label">
              REVENUE
            </span>

          </div>

          <h2>
            ${kpis.total_revenue.toLocaleString()}
          </h2>

          <p>
            Total Revenue
          </p>

        </div>


        <div className="kpi-card">

          <div className="kpi-top">

            <div className="icon-box">
              🛒
            </div>

            <span className="kpi-label">
              ORDERS
            </span>

          </div>

          <h2>
            {kpis.total_orders.toLocaleString()}
          </h2>

          <p>
            Total Orders
          </p>

        </div>


        <div className="kpi-card">

          <div className="kpi-top">

            <div className="icon-box">
              ↗
            </div>

            <span className="kpi-label">
              AOV
            </span>

          </div>

          <h2>
            ${kpis.aov.toFixed(2)}
          </h2>

          <p>
            Average Order Value
          </p>

        </div>


      </section>
      <p className="dashboard-note">
        Revenue and order metrics provide the overall sales baseline, while
        category, state, and customer analysis highlights where business value
        is concentrated.
      </p>


      {/* =========================
       CATEGORY REVENUE
      ========================= */}

      {salesSummary && (

        <section className="content-card">

          <div className="card-header">

            <div>

              <span className="section-kicker">
                PRODUCT PERFORMANCE
              </span>

              <h2>
                Top 10 Categories by Revenue
              </h2>

              <p>
                See which product categories contribute the most revenue.
              </p>

            </div>

          </div>


          <div className="chart-container">

            <ResponsiveContainer
              width="100%"
              height={450}
            >

              <BarChart
                data={salesSummary.category_revenue}
                layout="vertical"
                margin={{
                  top: 10,
                  right: 20,
                  left: 10,
                  bottom: 10,
                }}
              >

                <CartesianGrid
                  strokeDasharray="4 4"
                  vertical={false}
                />

                <XAxis
                  type="number"
                  tickFormatter={(value) =>
                    `$${(value / 1000).toFixed(0)}K`
                  }

                />

                <YAxis
                  type="category"
                  dataKey="category"
                  width={150}
                />

                <Tooltip
                  formatter={(value) =>
                    `$${Number(value).toLocaleString()}`
                  }
                  labelFormatter={(label) =>
                    `Category: ${label}`
                  }
                />

                <Bar
                  dataKey="revenue"
                  fill="#2563eb"
                  radius={[6, 6, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </section>

      )}


      {/* =========================
       STATE REVENUE
      ========================= */}

      {salesSummary && (

        <section className="content-card">

          <div className="card-header">

            <div>

              <span className="section-kicker">
                REGIONAL PERFORMANCE
              </span>

              <h2>
                Top 10 States by Revenue
              </h2>

              <p>
                Compare revenue contribution across the strongest regional markets.
              </p>

            </div>

          </div>


          <div className="chart-container">

            <ResponsiveContainer
              width="100%"
              height={420}
            >

              <BarChart
                data={salesSummary.state_revenue}
                layout="vertical"
                margin={{
                  top: 10,
                  right: 20,
                  left: 10,
                  bottom: 10,
                }}
              >

                <CartesianGrid
                  strokeDasharray="4 4"
                  vertical={false}
                />

                <XAxis
                  type="number"
                  tickFormatter={(value) =>
                    `$${(value / 1000).toFixed(0)}K`
                  }

                />

                
                <YAxis
                  type="category"
                  dataKey="state"
                  width={50}
                />



                <Tooltip
                  formatter={(value) =>
                    `$${Number(value).toLocaleString()}`
                  }
                  labelFormatter={(label) =>
                    `State: ${label}`
                  }
                />

                <Bar
                  dataKey="revenue"
                  fill="#2563eb"
                  radius={[6, 6, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </section>

      )}


      {/* =========================
       TOP CUSTOMERS
      ========================= */}

      {salesSummary && (

        <section className="content-card">

          <div className="card-header">

            <div>

              <span className="section-kicker">
                CUSTOMER VALUE
              </span>

              <h2>
                Top 10 Customers by Revenue
              </h2>

              <p>
                Identify customers contributing the highest purchase value.
              </p>

            </div>

          </div>



          <div className="chart-container">

            <ResponsiveContainer
              width="100%"
              height={420}
            >


              <BarChart
                data={salesSummary.top_customers}
                layout="vertical"
                margin={{
                  top: 10,
                  right: 20,
                  left: 20,
                  bottom: 10,
                }}
              >

                <CartesianGrid
                  strokeDasharray="4 4"
                  horizontal={false}
                />

                <XAxis
                  type="number"
                  tickFormatter={(value) =>
                    `$${(value / 1000).toFixed(0)}K`
                  }
                />

                <YAxis
                  type="category"
                  dataKey="customer"
                  width={100}
                  tickFormatter={(value) => `${value.slice(0, 8)}...`}
                />

                <Tooltip
                  formatter={(value) =>
                    `$${Number(value).toLocaleString()}`
                  }
                  labelFormatter={(label) =>
                    `Customer ID: ${label}`
                  }
                />


                <Bar
                  dataKey="revenue"
                  fill="#2563eb"
                  radius={[0, 6, 6, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </section>

      )}

    </>

  );

  /* =========================
     DELIVERY ANALYTICS PAGE
  ========================= */

  const DeliveryAnalyticsPage = () => (

    <>

      {/* =========================
       HEADER
      ========================= */}

      <header className="header">

        <div>

          <p className="eyebrow">
            LOGISTICS PERFORMANCE
          </p>

          <h1>
            Delivery Analytics
          </h1>

          <p className="subtitle">
            Monitor delivery speed, late orders, and regional delivery risk.
          </p>

        </div>

        <div className="header-badge">
          ● DELIVERY PERFORMANCE
        </div>

      </header>


      {/* =========================
       DELIVERY KPIs
      ========================= */}

      <section className="kpi-grid">

        <div className="kpi-card">

          <div className="kpi-top">

            <div className="icon-box">
              🚚
            </div>

            <span className="kpi-label">
              LATE DELIVERY
            </span>

          </div>

          <h2>
            {kpis.late_delivery_percentage.toFixed(2)}%
          </h2>

          <p>
            Orders delivered late
          </p>

        </div>


        <div className="kpi-card">

          <div className="kpi-top">

            <div className="icon-box">
              ⏱
            </div>

            <span className="kpi-label">
              DELIVERY TIME
            </span>

          </div>

          <h2>
            {fmtDays(kpis.average_delivery_days)} Days
          </h2>

          <p>
            Average delivery duration
          </p>

        </div>


        <div className="kpi-card">

          <div className="kpi-top">

            <div className="icon-box">
              📦
            </div>

            <span className="kpi-label">
              ORDERS
            </span>

          </div>

          <h2>
            {kpis.total_orders.toLocaleString()}
          </h2>

          <p>
            Orders analyzed
          </p>

        </div>

      </section>


      {/* =========================
       LATE DELIVERY RATE
      ========================= */}

      {deliverySummary && (

        <section className="content-card">

          <div className="card-header">

            <div>

              <span className="section-kicker">
                REGIONAL LOGISTICS
              </span>

              <h2>
                Late Delivery by State
              </h2>

              <p>
                Percentage of evaluated orders delivered later than estimated by state.
              </p>

            </div>

          </div>


          <div className="chart-container">

            <ResponsiveContainer
              width="100%"
              height={450}
            >

              <BarChart
                data={deliverySummary.state_delivery}
                margin={{
                  top: 10,
                  right: 10,
                  left: 2,
                  bottom: 3,
                }}

              >

                <CartesianGrid
                  strokeDasharray="4 4"
                  vertical={false}
                />

                <XAxis
                  dataKey="customer_state"
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={70}

                />

                <YAxis
                  tickFormatter={(value) => `${value}%`}
                />

                <Tooltip
                  formatter={(value) =>
                    `${Number(value).toFixed(2)}%`
                  }
                  labelFormatter={(label) =>
                    `state: ${label}`
                  }
                />

                <Bar
                  dataKey="late_delivery_percentage"
                  fill="#2563eb"
                  radius={[5, 5, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </section>

      )}


      {/* =========================
       LATE ORDERS BY STATE
      ========================= */}

      {deliverySummary && (

        <section className="content-card">

          <div className="card-header">

            <div>

              <span className="section-kicker">
                DELIVERY RISK
              </span>

              <h2>
                Top 10 States by Late Orders
              </h2>

              <p>
                States with the highest number of orders delivered late.
              </p>

            </div>

          </div>


          <div className="chart-container">

            <ResponsiveContainer
              width="100%"
              height={380}
            >

              <BarChart
                data={deliverySummary.top_late_states}
                layout="vertical"
                margin={{
                  top: 10,
                  right: 10,
                  left: 10,
                  bottom: 10,
                }}
              >

                <CartesianGrid
                  strokeDasharray="4 4"
                  vertical={false}
                />

                <XAxis
                  type="number"
                  tickFormatter={(value) =>
                    Number(value).toLocaleString()
                  }
                />

                <YAxis
                  type="category"
                  dataKey="customer_state"
                  width={50}
                />

                <Tooltip
                  formatter={(value) =>
                    Number(value).toLocaleString()
                  }
                />

                <Bar
                  dataKey="late_orders"
                  fill="#2563eb"
                  radius={[0, 6, 6, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </section>

      )}


      {/* =========================
       DELIVERY SUMMARY
      ========================= */}

      <section className="content-card">

        <div className="card-header">

          <div>

            <span className="section-kicker">
              OPERATIONAL SUMMARY
            </span>

            <h2>
              Delivery Performance Summary
            </h2>

            <p>
              Key operational indicators from the delivery analysis.
            </p>

          </div>

        </div>


        <div className="insights-grid">

          <div className="insight-card">

            <span className="insight-label">
              DELIVERY SPEED
            </span>

            <h3>
              Average Delivery Time
            </h3>

            <p className="insight-value">
              {kpis
                ? `${fmtDays(kpis.average_delivery_days)} days`
                : "Loading..."}
            </p>

            <p>
              Average time required to  complete order delivery.
            </p>

          </div>


          <div className="insight-card">

            <span className="insight-label">
              DELIVERY RISK
            </span>

            <h3>
              Late Delivery Rate
            </h3>

            <p className="insight-value">
              {kpis
                ? `${kpis.late_delivery_percentage.toFixed(2)}%`
                : "Loading..."}
            </p>

            <p>
              Share of evaluated orders delivered later than estimated.
            </p>

          </div>


          <div className="insight-card">

            <span className="insight-label">
              STATUS
            </span>

            <h3>
              Delivery Status
            </h3>

            <p className="insight-value">

              {kpis
                ? kpis.late_delivery_percentage > 10
                  ? "Needs Attention"
                  : kpis.late_delivery_percentage > 5
                    ? "Monitor"
                    : "Good"
                : "Loading..."}

            </p>

            <p>
              Overall logistics Status based on the current late-delivery rate.
            </p>

          </div>

        </div>

      </section>

    </>

  );

  /* =========================
     BUSINESS INSIGHTS PAGE
  ========================= */

  const BusinessInsightsPage = () => {

    const topCategory =
      salesSummary?.category_revenue?.[0]?.category
        ? salesSummary.category_revenue[0].category
          .replace(/_/g, " ")
          .replace(/\b\w/g, char => char.toUpperCase())
        : "Loading...";

    const topState =
      salesSummary?.state_revenue?.[0]?.state || "Loading...";

    const lateDeliveryRate =
      kpis?.late_delivery_percentage ?? 0;

    const deliveryStatus =
      lateDeliveryRate > 10
        ? "Needs Attention"
        : lateDeliveryRate > 5
          ? "Requires Monitoring"
          : "Performing Well";

    return (

      <>

        {/* =========================
          HEADER
        ========================= */}

        <header className="header">

          <div>

            <p className="eyebrow">
              BUSINESS INTELLIGENCE
            </p>

            <h1>
              Business Insights
            </h1>

            <p className="subtitle">
              Turn e-commerce analytics into clear business decisions and actions.
            </p>

          </div>

          <div className="header-badge">
            ● BUSINESS INTELLIGENCE
          </div>

        </header>


        {/* =========================
          EXECUTIVE SNAPSHOT
        ========================= */}

        <section className="content-card">

          <div className="card-header">

            <div>

              <span className="section-kicker">
                EXECUTIVE SNAPSHOT
              </span>

              <h2>
                Business Performance at a Glance
              </h2>

              <p>
                The most important commercial and operational indicators from the analysis.
              </p>

            </div>

          </div>


          <div className="overview-grid">

            <div>

              <span>
                Total Revenue
              </span>

              <strong>
                {kpis
                  ? `$${kpis.total_revenue.toLocaleString()}`
                  : "Loading..."}
              </strong>

              <p>
                Revenue generated across the analyzed orders.
              </p>

            </div>


            <div>

              <span>
                Top Revenue State
              </span>

              <strong>
                {topState}
              </strong>

              <p>
                State contributing the highest revenue.
              </p>

            </div>


            <div>

              <span>
                Leading Category
              </span>

              <strong>
                {topCategory}
              </strong>

              <p>
                Product category generating the highest revenue.
              </p>

            </div>


            <div>

              <span>
                Late Delivery Rate
              </span>

              <strong>
                {kpis
                  ? `${lateDeliveryRate.toFixed(2)}%`
                  : "Loading..."}
              </strong>

              <p>
                Share of analyzed orders identified as late.
              </p>

            </div>

          </div>

        </section>


        {/* =========================
          KEY INSIGHTS
        ========================= */}

        <section className="content-card">

          <div className="card-header">

            <div>

              <span className="section-kicker">
                KEY INSIGHTS
              </span>

              <h2>
                What the Data Tells Us
              </h2>

              <p>
                Business observations identified from sales, regional, category, and delivery performance analysis.
              </p>

            </div>

          </div>


          <div className="insights-grid">


            <div className="insight-card">

              <span className="insight-label">
                REVENUE
              </span>

              <h3>
                Revenue provides a strong commercial base
              </h3>

              <p>
                The anlalyzed business generated{" "}
                <strong>
                  {kpis
                    ? `$${kpis.total_revenue.toLocaleString()}`
                    : "Loading..."}
                </strong>
                {" "}in revenue across the analyzed orders, creating a strong
                base for identifying the categories and markets contributing
                most to overall performance.
              </p>

            </div>


            <div className="insight-card">

              <span className="insight-label">
                CATEGORY
              </span>

              <h3>
                {topCategory} is the leading category
              </h3>

              <p>
                {topCategory} generates the highest revenue among the
                analyzed product categories. This indicates a strong
                commercial opportunity to protect its performance and
                evaluate opportunities for further growth.
              </p>

            </div>


            <div className="insight-card">

              <span className="insight-label">
                REGIONAL
              </span>

              <h3>
                {topState} is the strongest  revenue market
              </h3>

              <p>
                {topState} contributes the highest revenue among customer
                states. Maintaining service quality and understanding the
                factors behind this performance can support continued growth.
              </p>

            </div>


            <div className="insight-card">

              <span className="insight-label">
                OPERATIONS
              </span>

              <h3>
                Delivery performance requires monitoring
              </h3>

              <p>
                The current late-delivery rate is{" "}
                <strong>
                  {lateDeliveryRate.toFixed(2)}%
                </strong>
                . Regional delivery perfformance should be monitored to
                identify areas where fulfillment or logistics improvements
                could reduce delays.
              </p>

            </div>

          </div>

        </section>


        {/* =========================
          RECOMMENDATIONS
        ========================= */}

        <section className="content-card">

          <div className="card-header">

            <div>

              <span className="section-kicker">
                RECOMMENDATIONS
              </span>

              <h2>
                Recommended Business Actions
              </h2>

              <p>
                Practical actions derived from the observed sales and
                operational performance.
              </p>

            </div>

          </div>


          <div className="insights-grid">


            <div className="insight-card">

              <span className="insight-label">
                SALES GROWTH
              </span>

              <h3>
                Protect and expand leading categories
              </h3>

              <p>
                Maintain focus on leading categories such as{" "}
                <strong>
                  {topCategory}
                </strong>
                {" "}by monitoring demand, product availability, and
                customer purchasing patterns to identify additional
                revenue opportunities.
              </p>

            </div>


            <div className="insight-card">

              <span className="insight-label">
                MARKET STRATEGY
              </span>

              <h3>
                Protect strong regional markets
              </h3>

              <p>
                Continue supporting strong-performing regions such as{" "}
                <strong>
                  {topState}
                </strong>
                {" "} while comparing performance across other states to
                identify markets with potential for additional growth.
              </p>

            </div>


            <div className="insight-card">

              <span className="insight-label">
                LOGISTICS
              </span>

              <h3>
                Reduce delivery delays
              </h3>

              <p>
                Monitor states with higher late-order volumes and
                investigate fulfillment, carrier, and delivery-time
                patterns that may be contributing to delays.                
              </p>

            </div>


            <div className="insight-card">

              <span className="insight-label">
                CUSTOMER STRATEGY
              </span>

              <h3>
                Improve customer retention
              </h3>

              <p>
                Analyze high-value and repeat-purchasing behavior to identify
                valuable customer segments and develop targeted retention
                opportunities.
              </p>

            </div>

          </div>

        </section>


        {/* =========================
          MANAGEMENT PRIORITIES
        ========================= */}

        <section className="content-card">

          <div className="card-header">

            <div>

              <span className="section-kicker">
                MANAGEMENT PRIORITIES
              </span>

              <h2>
                Where to Focus Next
              </h2>

              <p>
                Priority areas that can guide the next stage of business
                analysis and decision-making.
              </p>

            </div>

          </div>

          <div className="overview-grid">

            <div>

              <span>
                GROWTH PRIORITY
              </span>

              <strong>
                {topCategory}
              </strong>

              <p>
                Protect and expand the strongest revenue-generating
                product category.
              </p>

            </div>

            <div>

              <span>
                MARKET PRIORITY
              </span>

              <strong>
                {topState}
              </strong>

              <p>
                Maintain the strongest market while identifying
                opportunities in other regions.
              </p>

            </div>

            <div>

              <span>
                OPERATIONAL PRIORITY
              </span>

              <strong>
                Delivery
              </strong>

              <p>
                Reduce late orders by monitoring higher-risk states and
                fulfillment performance.
              </p>

            </div>

            <div>

              <span>
                NEXT ANALYSIS
              </span>

              <strong>
                Customer Retention
              </strong>

              <p>
                Analyze repeat purchases, customer frequency, and
                high-value customer segments.
              </p>

            </div>

          </div>

        </section>

        {/* =========================
          ANALYST TAKEAWAY
        ========================= */}

        <section className="content-card">

          <div className="card-header">

            <div>

              <span className="section-kicker">
                ANALYST TAKEAWAY
              </span>

              <h2>
                Overall Business Perspective
              </h2>

              <p>
                A concise conclusion from the complete analysis.
              </p>

            </div>

          </div>


          <div className="analyst-takeaway">

            <p>
              The analysis identifies clear revenue strength across
              leading product categories and regional markets, with
              <strong>
                {" "} {topCategory}
              </strong>
              {" "}and{" "}
              <strong>
                {topState}
              </strong>
              {" "}representing important areas of commerical performance.
            </p>
            <p>
              From an operational perspective, the{" "}
              <strong>
                {lateDeliveryRate.toFixed(2)}%
              </strong>
              {" "}late-delivery rate indicates that delivery performance
              should remain an area of monitoring, particulary across
              higher-risk regions.

            </p>

            <p>
              The recommended business focus is to protect high-performing
              revenue segments, strengthen successful markets, improve
              delivery reliability, and further analyze customer retention
              and repeat-purchase behaviour.
            </p>

          </div>

        </section>

      </>

    );
  };


  /* =========================
     DATA & METHODOLOGY PAGE
  ========================= */
  const MethodologyPage = () => (

    <>

      {/* =========================
        HEADER
      ========================= */}

      <header className="header">

        <div>

          <p className="eyebrow">
            DATA & METHODOLOGY
          </p>

          <h1>
            Data & Methodology
          </h1>

          <p className="subtitle">
            Explore how the Olist data was prepared, validated, analyzed,
            and transformed into business insights.
          </p>

        </div>

        <div className="header-badge">
          ● ANALYTICAL WORKFLOW
        </div>


      </header>


      {/* =========================
        DATASET OVERVIEW
      ========================= */}

      <section className="content-card">

        <div className="card-header">

          <div>

            <span className="section-kicker">
              DATASET OVERVIEW
            </span>

            <h2>
              Olist E-Commerce Dataset
            </h2>

            <p>
              Brazilian Olist E-Commerce Public Dataset used as the primary source for the analysis.
            </p>

          </div>

        </div>


        <div className="overview-grid">

          <div>

            <span>
              Analytical Rows
            </span>

            <strong>
              {methodology
                ? methodology.rows.toLocaleString()
                : "Loading..."}
            </strong>

            <p>
              Line-item records in the final analytical dataset.
            </p>

          </div>


          <div>

            <span>
              Columns
            </span>

            <strong>
              {methodology
                ? methodology.columns
                : "Loading..."}
            </strong>

            <p>
              Fields available after data preparation.
            </p>

          </div>


          <div>

            <span>
              Unique Orders
            </span>

            <strong>
              {methodology
                ? methodology.orders.toLocaleString()
                : "Loading..."}
            </strong>

            <p>
              Distinct orders included in the analysis.
            </p>

          </div>


          <div>

            <span>
              Unique Customers
            </span>

            <strong>
              {methodology
                ? methodology.customers.toLocaleString()
                : "Loading..."}
            </strong>

            <p>
              Distinct customer records represented in the analysis.
            </p>

          </div>


          <div>

            <span>
              Unique Products
            </span>

            <strong>
              {methodology
                ? methodology.products.toLocaleString()
                : "Loading..."}
            </strong>

            <p>
              Distinct products represented in the dataset.
            </p>

          </div>


          <div>

            <span>
              Delivered Orders
            </span>

            <strong>
              {methodology
                ? methodology.delivered_orders.toLocaleString()
                : "Loading..."}
            </strong>

            <p>
              Orders with delivered status.
            </p>

          </div>

        </div>

      </section>


      {/* =========================
        DATA PREPARATION
      ========================= */}

      <section className="content-card">

        <div className="card-header">

          <div>

            <span className="section-kicker">
              DATA PREPARATION
            </span>

            <h2>
              Cleaning & Transformation
            </h2>

            <p>
              Raw e-commerce data was prepared and transformed before business analysis.
            </p>

          </div>

        </div>


        <div className="methodology-steps">


          <div className="methodology-step">

            <div className="step-number">
              01
            </div>

            <div>

              <h3>
                Data Exploration
              </h3>

              <p>
                Reviewed the available datasets, columns, data types,
                duplicate records, missing values, and order-status distribution
                before beginning the analysis.
              </p>

            </div>

          </div>


          <div className="methodology-step">

            <div className="step-number">
              02
            </div>

            <div>

              <h3>
                Data Cleaning
              </h3>

              <p>
                Converted dates and numeric fields into appropriate formats,
                reviewed missing values, and removed canceled orders from
                the main analytical dataset.
              </p>

            </div>

          </div>


          <div className="methodology-step">

            <div className="step-number">
              03
            </div>

            <div>

              <h3>
                Dataset Integration
              </h3>

              <p>
                Combined order, customer, product, and order-item information
                using the relevant identifiers to create a unified analytical dataset.
              </p>

            </div>

          </div>


          <div className="methodology-step">

            <div className="step-number">
              04
            </div>

            <div>

              <h3>
                Feature Engineering
              </h3>

              <p>
                Created revenue, delivery duration, late-delivery flag,
                and monthly fields to support sales and business analysis.
              </p>

            </div>

          </div>


          <div className="methodology-step">

            <div className="step-number">
              05
            </div>

            <div>

              <h3>
                Analytical Validation
              </h3>

              <p>
                Cross-checked important metrics across Python, MySQL,
                Excel, and Power BI to maintain consistency in the analysis.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
        DATA QUALITY
      ========================= */}

      <section className="content-card">

        <div className="card-header">

          <div>

            <span className="section-kicker">
              DATA QUALITY
            </span>

            <h2>
              Key Analytical Decisions
            </h2>

            <p>
              Important data-handling decisions used to maintain a
              reliable and consistent analytical dataset.
            </p>

          </div>

        </div>


        <div className="insights-grid">


          <div className="insight-card">

            <span className="insight-label">
              ORDER STRUCTURE
            </span>

            <h3>
              Legitimate line items preserved
            </h3>

            <p>
              Multiple rows can belong to the same order because an order
              may contain multiple products. Order-level duplicates were
              therefore not removed blindly.
            </p>

          </div>


          <div className="insight-card">

            <span className="insight-label">
              CANCELLED ORDERS
            </span>

            <h3>
              Excluded from the main analysis
            </h3>

            <p>
              Cancelled orders were excluded from the primary sales analysis
              so that cancelled transactions were not treated as completed sales.
            </p>

          </div>


          <div className="insight-card">

            <span className="insight-label">
              DELIVERY DATA
            </span>

            <h3>
              Missing delivery values preserved
            </h3>

            <p>
              Missing delivery dates were retained as missing values rather
              than converted to zero because unavailable delivery information
              does not represent zero delivery time.
            </p>

          </div>


          <div className="insight-card">

            <span className="insight-label">
              ORDER METRICS
            </span>

            <h3>
              Distinct orders used for KPIs
            </h3>

            <p>
              Order-level metrics use distinct order IDs because a single
              order can contain multiple line-item records.
            </p>

          </div>


        </div>

      </section>

      {/* =========================
        CALCULATED METRICS
      ========================= */}

      <section className="content-card">

        <div className="card-header">

          <div>

            <span className="section-kicker">
              BUSINESS METRICS
            </span>

            <h2>
              Calculated Metrics
            </h2>

            <p>
              Metrics created from the cleaned dataset for business analysis.
            </p>

          </div>

        </div>


        <div className="insights-grid">


          <div className="insight-card">

            <span className="insight-label">
              REVENUE
            </span>

            <h3>
              Revenue
            </h3>

            <p className="insight-value">
              Price + Freight Value
            </p>

            <p>
              Combines product price and freight value to calculate
              revenue at the order-item level.
            </p>

          </div>


          <div className="insight-card">

            <span className="insight-label">
              ORDER VALUE
            </span>

            <h3>
              Average Order Value
            </h3>

            <p className="insight-value">
              Total Revenue ÷ Unique Orders
            </p>

            <p>
              Measures the average revenue generated per unique order.
            </p>

          </div>


          <div className="insight-card">

            <span className="insight-label">
              DELIVERY
            </span>

            <h3>
              Delivery Days
            </h3>

            <p className="insight-value">
              Delivered Date − Purchase Date
            </p>

            <p>
              Measures the number of days taken to deliver an order.
            </p>

          </div>


          <div className="insight-card">

            <span className="insight-label">
              RISK
            </span>

            <h3>
              Late Flag
            </h3>

            <p className="insight-value">
              1 = Late · 0 = On Time
            </p>

            <p>
              Identifies orders delivered after the estimated delivery date.
            </p>

          </div>

        </div>

      </section>


      {/* =========================
        ANALYTICAL WORKFLOW
      ========================= */}

      <section className="content-card">

        <div className="card-header">

          <div>

            <span className="section-kicker">
              ANALYTICAL WORKFLOW
            </span>

            <h2>
              From Raw Data to Business Insight
            </h2>

            <p>
              The project follows a structured workflow from data preparation
              to analysis, visualization, and business recommendations.
              .
            </p>

          </div>

        </div>


        <div className="workflow-grid">

          <div>

            <span>
              01
            </span>

            <strong>
              Collect
            </strong>

            <p>
              Load and inspect the Olist datasets to understand their 
              structure, fields, and available business information.
            </p>

          </div>


          <div>

            <span>
              02
            </span>

            <strong>
              Clean
            </strong>

            <p>
              Prepare data types, review missing values, handle
              duplicates, and remove records that should not be
              included in the main analysis.
            </p>

          </div>


          <div>

            <span>
              03
            </span>

            <strong>
              Transform
            </strong>

            <p>
              Combine related datasets and create analytical fields
              such as revenue, delivery days,  late flag, and month.
            </p>

          </div>


          <div>

            <span>
              04
            </span>

            <strong>
              Analyze
            </strong>

            <p>
              Calculate KPIs and identify business patterns.
            </p>

          </div>


          <div>

            <span>
              05
            </span>

            <strong>
              Visualize
            </strong>

            <p>
              Present analytical results through Excel reports,
              Power BI dashboards, and interactive web charts.
            </p>

          </div>


          <div>

            <span>
              06
            </span>

            <strong>
              Recommend
            </strong>

            <p>
              Convert findings into practical business actions
              focused on growth, markets, customers, and delivery.
            </p>

          </div>

        </div>
        <div className="workflow-note">

          <div>
            <span className="section-kicker">ANALYTICS WORKFLOW</span>

            <h3>
              One dataset, multiple analytical perspectives
            </h3>

            <p>
              The cleaned dataset powers the SQL analysis,
              Excel reporting, Power BI dashboards, and the
              interactive web application. This keeps the project
              consistent across different analytical tools and delivery layers.
            </p>
          </div>

          <div className="workflow-tools">

            <span>Python</span>
            <span>Pandas</span>
            <span>MySQL</span>
            <span>Excel</span>
            <span>Power BI</span>
            <span>FastAPI</span>
            <span>React</span>
            <span>Recharts</span>

          </div>

        </div>

      </section>
     
      {/* =========================
         PROJECT ARCHITECTURE
      ========================= */}

      <section className="content-card architecture-card">

        <div className="card-header">

          <div>

            <span className="section-kicker">
              PROJECT ARCHITECTURE
            </span>

            <h2>
              From Raw Data to Interactive Analytics
            </h2>

            <p>
              The project moves from raw e-commerce data through a
              centralized analytical dataset into SQL analysis,
              reporting, business insights, and the interactive web application.
            </p>

          </div>

        </div>


        <div className="architecture-flow">


          {/* STEP 01 */}

          <div className="architecture-node">

            <span>01</span>

            <strong>
              Olist Raw Data
            </strong>

            <p>
              Orders, order items, customers, products, and
              category translation data.
            </p>

          </div>


          <div className="architecture-arrow">
            ↓
          </div>


          {/* STEP 02 */}

          <div className="architecture-node">

            <span>02</span>

            <strong>
              Python + Pandas
            </strong>

            <p>
              Exploration, cleaning, merging, transformation,
              validation, and feature engineering.
            </p>

          </div>


          <div className="architecture-arrow">
            ↓
          </div>


          {/* STEP 03 */}

          <div className="architecture-node highlight-node">

            <span>03</span>

            <strong>
              Cleaned Analytical Dataset
            </strong>

            <p>
              ecommerce_clean.csv containing prepared data
              and calculated analytical fields.
            </p>

          </div>


          <div className="architecture-arrow">
            ↓
          </div>


          {/* STEP 04 */}

          <div className="architecture-node">

            <span>04</span>

            <strong>
              Analysis & Reporting
            </strong>

            <p>
              Multiple analytical tools use the same cleaned
              dataset for analysis and reporting.
            </p>


            <div className="architecture-tools">

              <div>
                <strong>
                  MySQL
                </strong>

                <span>
                  SQL Analysis
                </span>
              </div>


              <div>
                <strong>
                  Excel
                </strong>

                <span>
                  Reporting
                </span>
              </div>


              <div>
                <strong>
                  Power BI
                </strong>

                <span>
                  BI Dashboards
                </span>
              </div>

            </div>

          </div>


          <div className="architecture-arrow">
            ↓
          </div>


          {/* STEP 05 */}

          <div className="architecture-node">

            <span>05</span>

            <strong>
              Business Insights
            </strong>

            <p>
              Revenue trends, category performance, regional
              contribution, customer value, and delivery performance.
            </p>

          </div>


          <div className="architecture-arrow">
            ↓
          </div>


          {/* STEP 06 */}

          <div className="architecture-node">

            <span>06</span>

            <strong>
              FastAPI + React
            </strong>

            <p>
              FastAPI serves analytical data while React and
              Recharts provide the interactive analytics application.
            </p>

          </div>


        </div>

      </section>
      {/* =========================
        TECHNOLOGY STACK
      ========================= */}

      <section className="content-card">

        <div className="card-header">

          <div>

            <span className="section-kicker">
              TECHNOLOGY STACK
            </span>

            <h2>
              Technologies Used Across the Project
            </h2>

            <p>
              Technologies used to prepare, analyze, visualize, and deliver the
              e-commerce analytics project.
            </p>

          </div>

        </div>


        <div className="technology-grid">

          <div>

            <strong>
              Python
            </strong>

            <span>
              Data Preparation
            </span>
            <p>
              Used for data exploration, cleaning, transformation,
              aggregation, and analytical validation.
            </p>

          </div>
          <div>

            <strong>
              Pandas
            </strong>

            <span>
              Data Transformation
            </span>

            <p>
              Data cleaning, merging, aggregation, and feature engineering.
            </p>

          </div>


          <div>

            <strong>
              MySQL
            </strong>

            <span>
              Business Analysis
            </span>


            <p>
              SQL queries for business metrics, sales analysis, delivery analysis, and data validation.
            </p>

          </div>


          <div>

            <strong>
              Excel
            </strong>

            <span>
              Reporting
            </span>

            <p>
              KPI summaries, category and state analytics, and management reporting.
            </p>

          </div>


          <div>
            <strong>
              Power BI
            </strong>

            <span>
              BI Visualization
            </span>

            <p>
              Interactive dashboards, KPI monitoring, sales analysis, and delivery performance analysis.
            </p>

          </div>


          <div>

            <strong>
              FastAPI
            </strong>

            <span>
              Backend API
            </span>
            <p>Provides API endpoints for KPIs, sales analytics, delivery metrics, and project methodology data.</p>

          </div>


          <div>
            <strong>
              React
            </strong>

            <span>
              Frontend Application
            </span>

            <p>
              Builds the responsive analytics interface with reusable 
              components and interactive dashboards views.
            </p>

          </div>


          <div>
            <strong>
              Recharts
            </strong>

            <span>
              Interactive Charts.
            </span>

            <p>
              Provides interactive charts for revenue trends, sales performance, 
              and delivery analytics.
            </p>

          </div>

        </div>

      </section>


      {/* =========================
        METHODOLOGY NOTE
    ========================= */}

      <section className="content-card">

        <div className="card-header">

          <div>
            <span className="section-kicker">
              METHODOLOGY NOTE
            </span>

            <h2>
              A Consistent Analytical Foundation
            </h2>

            <p>
              The Project uses a single cleaned analytical dataset
              as the foundation for analysis, reporting, and visualization.
            </p>
          </div>

        </div>


        <div className="analyst-takeaway">

          <p>
            Python and Pandas were used to prepare the analytical
            dataset, while MySQL, Excel, and Power BI supported
            analysis and reporting.
          </p>

          <p>
            The same analytical definitions are used across the
            dashboards and web application to maintain consistency
            between the project's different outputs.
          </p>

        </div>

      </section>

    </>

  );


  /* =========================
     PAGE ROUTING
  ========================= */
  let pageContent;

  if (activePage === "Home") {
    pageContent = <HomePage />;
  }

  else if (activePage === "Dashboard") {
    pageContent = <DashboardPage />;
  }
  else if (activePage === "Sales Analytics") {
    pageContent = <SalesAnalyticsPage />;
  }
  else if (activePage === "Delivery Analytics") {
    pageContent = <DeliveryAnalyticsPage />;
  }
  else if (activePage === "Business Insights") {
    pageContent = <BusinessInsightsPage />;
  }
  else if (activePage === "Data & Methodology") {
    pageContent = <MethodologyPage />;
  }

  else {
    pageContent = <DashboardPage />;
  }

  /* =========================
     MAIN UI
  ========================= */

  return (

    <div className="dashboard">

      {/* Sidebar */}

      <aside className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>

        <div className="logo">

          <div className="logo-mark">
            O
          </div>

          {!sidebarCollapsed && (
            <div>
              <h2>Olist</h2>
              <span>Analytics</span>
            </div>
          )}

        </div>

        <button
          className="sidebar-toggle"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {sidebarCollapsed ? "→" : "←"}
        </button>

        <nav className="sidebar-nav">

          {menuItems.map((item) => (

            <button
              key={item.name}
              type="button"
              className={`menu-item ${activePage === item.name ? "active" : ""
                }`}
              onClick={() => setActivePage(item.name)}
              title={sidebarCollapsed ? item.name : ""}
            >

              <span className="menu-icon">
                {item.icon}
              </span>

              {!sidebarCollapsed && (
                <span className="menu-label">
                  {item.name}
                </span>
              )}

            </button>

          ))}

        </nav>

        {!sidebarCollapsed && (
          <div className="sidebar-footer">

            <span className="status-dot"></span>

            <span>Dataset Loaded</span>

          </div>
        )}

      </aside>


      {/* Main Content */}

      <main className="main-content">

        {pageContent}

      </main>

    </div>

  );
}
export default App;
