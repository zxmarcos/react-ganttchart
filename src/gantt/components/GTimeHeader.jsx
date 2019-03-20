import React, { Component } from "react";
import DateUtils from "../core/DateUtils";

const monthNames = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro"
];

const createMonthSpan = (m, y) => {
  return {
    month: `${monthNames[m]}, ${y}`,
    span: 1
  };
};

export default class GTimeHeader extends Component {
  render() {
    const { start, end } = this.props;

    const days = [];
    const totalDays = DateUtils.daysBetween(start, end);

    let lastYear = start.getUTCFullYear();
    let lastMonth = start.getUTCMonth();

    const monthSpans = [];
    const months = [];

    for (let dayNo = 0; dayNo <= totalDays; dayNo++) {
      const date = DateUtils.addDays(start, dayNo);

      // Cálcula os spans dos meses
      const dateMonth = date.getUTCMonth();
      const dateYear = date.getUTCFullYear();
      
      if (lastMonth !== dateMonth || lastYear !== dateYear || dayNo === 0) {
        monthSpans.push(createMonthSpan(dateMonth, dateYear));
      } else {
        monthSpans[monthSpans.length - 1].span++;
      }

      lastMonth = dateMonth;
      lastYear = dateYear;

      days.push(
        <td key={date.getTime()} className="g-header-day">
          {date.getUTCDate()}
        </td>
      );
    }

    for (const ms of monthSpans) {
      months.push(
        <td className="g-header-day g-header-month" colSpan={ms.span} key={ms.month}>
          {ms.month}
        </td>
      );
    }

    return (
      <table className="g-timeheader" cellPadding="0" cellSpacing="0">
        <thead>
          <tr className="g-header-row-height">{months}</tr>
          <tr className="g-header-row-height">{days}</tr>
        </thead>
      </table>
    );
  }
}
