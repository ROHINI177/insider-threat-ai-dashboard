import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const RiskChart = ({ data }) => {
  const ref = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const riskMap = {};
    data.forEach(log => {
      const uid = log.user_id;
      riskMap[uid] = (riskMap[uid] || 0) + (log.action === "delete" ? 3 : 1);
    });

    const chartData = Object.entries(riskMap).map(([user, score]) => ({
      user,
      score,
    }));

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 50, left: 50 };

    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const x = d3
      .scaleBand()
      .domain(chartData.map(d => d.user))
      .range([0, chartWidth])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(chartData, d => d.score) || 10])
      .range([chartHeight, 0]);

    const g = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Tooltip
    const tooltip = d3.select("body")
      .append("div")
      .attr("class", "absolute bg-white text-sm px-3 py-2 rounded shadow border border-gray-300")
      .style("pointer-events", "none")
      .style("opacity", 0);

    // Bars
    g.selectAll("rect")
      .data(chartData)
      .enter()
      .append("rect")
      .attr("x", d => x(d.user))
      .attr("y", d => y(d.score))
      .attr("width", x.bandwidth())
      .attr("height", d => chartHeight - y(d.score))
      .attr("rx", 5)
      .attr("fill", d =>
        d.score >= 10 ? "#ef4444" : d.score >= 5 ? "#f59e0b" : "#10b981"
      )
      .on("mouseover", function (event, d) {
        d3.select(this).transition().duration(150).attr("fill", "#3b82f6").attr("transform", "scaleY(1.05)");
        tooltip
          .style("opacity", 1)
          .html(`<strong>${d.user}</strong><br/>Risk Score: ${d.score}`)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mousemove", function (event) {
        tooltip
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", function (event, d) {
        d3.select(this)
          .transition()
          .duration(150)
          .attr("fill", d.score >= 10 ? "#ef4444" : d.score >= 5 ? "#f59e0b" : "#10b981")
          .attr("transform", "scaleY(1)");
        tooltip.style("opacity", 0);
      });

    // X Axis
    g.append("g")
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("font-size", "12px")
      .attr("fill", "#374151");

    // Y Axis
    g.append("g")
      .call(d3.axisLeft(y))
      .selectAll("text")
      .attr("font-size", "12px")
      .attr("fill", "#374151");

    // Labels
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height - 5)
      .attr("text-anchor", "middle")
      .text("User ID")
      .attr("fill", "#374151")
      .attr("font-size", "14px");

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", 15)
      .attr("text-anchor", "middle")
      .text("Risk Score")
      .attr("fill", "#374151")
      .attr("font-size", "14px");
  }, [data]);

  return <svg ref={ref}></svg>;
};

export default RiskChart;
