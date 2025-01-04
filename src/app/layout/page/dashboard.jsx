import React from "react";
import Chart from "react-apexcharts";
import { Row, Col, Card, Typography } from "antd";

const Dashboard = () => {
  const barChartOptions = {
    chart: {
      type: "bar",
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 500,
      },
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "70%",
      },
    },
    colors: ["#007bff"],
    dataLabels: {
      enabled: true,
    },
    xaxis: {
      categories: ["Compal", "TK", "Gliter", "Assa"],
    },
  };
  const barChartData = [
    {
      name: "Số nhân viên",
      data: [180, 20, 50, 200],
    },
  ];
  // Dữ liệu biểu đồ tròn
  const pieChartOptions = {
    chart: {
      type: "pie",
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 500,
      },
    },
    labels: ["Lương NLĐ", "Thưởng DS", "Thưởng khác", "Quà cáp", "Chi tiêu"],
    colors: ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0"],
  };

  const pieChartData = [54.6, 28.6, 14.3, 0.7, 1.8];

  // Dữ liệu biểu đồ đường
  const lineChartOptions = {
    chart: {
      type: "line",
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 500,
      },
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: getLast7Days(),
    },
    colors: ["#52c41a"],
  };

  const lineChartData = [
    {
      name: "Thu nhập",
      data: [5000000, 10000000, 15000000, 8000000, 12000000, 15000000],
    },
  ];
  function getLast7Days() {
    const days = [];
    const today = new Date();
    for (let i = 5; i >= -1; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      days.push(`${day}/${month}`);
    }
    return days;
  }

  return (
    <div className="dashboard-page">
      <div className="db-card">
        <div className="items !p-4 !rounded-lg bg-gradient-to-br from-[#6f83f5] to-[#360e94] text-[#fff]">
          <div className="name font-medium">Số giờ làm việc</div>
          <div className="value2 flex gap-1 items-baseline font-bold">
            <div className="text text-[30px]">{(5000).toLocaleString()}</div>
            <div className="sub text-[15px]">giờ</div>
          </div>
        </div>
        <div className="items !p-4 !rounded-lg bg-gradient-to-br from-[#58aeff] to-[#0151e6] text-[#fff]">
          <div className="name font-medium">Số người đi làm mới</div>
          <div className="value2 flex gap-1 items-baseline font-bold">
            <div className="text text-[30px]">400</div>
            <div className="sub text-[15px]">người</div>
          </div>
        </div>
        <div className="items !p-4 !rounded-lg bg-gradient-to-br from-[#5deafd] to-[#0577ac] text-[#fff]">
          <div className="name font-medium">Chi tiêu khác</div>
          <div className="value2 flex gap-1 items-baseline font-bold">
            <div className="text text-[30px]">2,3Tr</div>
            <div className="sub text-[15px]">VNĐ</div>
          </div>
        </div>
        <div className="items !p-4 !rounded-lg bg-gradient-to-br from-[#e2cd55] to-[#af6b05] text-[#fff]">
          <div className="name font-medium">Lương người lao động</div>
          <div className="value2 flex gap-1 items-baseline font-bold">
            <div className="text text-[30px]">462,8Tr</div>
            <div className="sub text-[15px]">VNĐ</div>
          </div>
        </div>
        <div className="items !p-4 !rounded-lg bg-gradient-to-br from-[#ffbd5a] to-[#d35309] text-[#fff]">
          <div className="name font-medium">Báo ứng tháng này</div>
          <div className="value2 flex gap-1 items-baseline font-bold">
            <div className="text text-[30px]">152,5Tr</div>
            <div className="sub text-[15px]">VNĐ</div>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="flex flex-col gap-2 w-[800px]">
          <div className="flex flex-1 gap-2">
            <div className="white-box p-3 flex flex-1">
              <div className="h3 p-1 font-semibold">
                Phân tích lượng lao động
              </div>
              <Chart
                options={barChartOptions}
                series={barChartData}
                type="bar"
                height={250}
                className="mb-[-20px] mt-[-20px]"
              />
            </div>
            <div className="white-box p-3 flex flex-1">
              <div className="h3 p-1 font-semibold">Phân tích tài chính</div>
              <Chart
                options={pieChartOptions}
                series={pieChartData}
                type="pie"
                height={250}
                className="mb-[-20px]"
              />
            </div>
          </div>
          <div className="flex flex-1 gap-2">
            <div className="white-box p-3 flex flex-1">
              <div className="h3 p-1 font-semibold">
                Số giờ làm việc 7 ngày gần nhất
              </div>
              <Chart
                options={lineChartOptions}
                series={lineChartData}
                type="line"
                height={250}
                className="mb-[-20px]"
              />
            </div>
            <div className="white-box p-3 flex flex-1">
              <div className="h3 p-1 font-semibold">
                5 người tuyển được nhiều nhất
              </div>
              <Chart
                className="mb-[-20px]"
                options={{
                  chart: {
                    type: "bar",
                    animations: {
                      enabled: true,
                      easing: "easeinout",
                      speed: 500,
                    },
                  },
                  plotOptions: {
                    bar: {
                      horizontal: false,
                    },
                  },
                  colors: ["#fa8c16"],
                  xaxis: {
                    categories: ["C", "VP HCM", "VP CT", "VP DN"],
                  },
                }}
                series={[
                  {
                    name: "Thu nhập",
                    data: [15000000, 10000000, 12000000, 8000000],
                  },
                ]}
                type="bar"
                height={250}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1"></div>
      </div>
    </div>
  );
};

export default Dashboard;
