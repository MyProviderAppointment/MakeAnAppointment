import React, { useState, useRef, useEffect } from "react";

const WeekCalendar = (selectedMonth, selectedYear) => {
	const handleDayView = (date) => {
		let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        month = month < 10 ? '0'+month : month;
        day = day < 10 ? '0'+day : day;
        let selDate = `${year}-${month}-${day}`;
        return selDate;
    }
	let daysInMonth = new Date(selectedYear, selectedMonth+1, 0).getDate();
	let newListDays = [];
	for (let i = 1; i <= daysInMonth; i++) {
		let date = new Date(selectedYear, selectedMonth, i);
		let selDate = handleDayView(date);
		newListDays.push({
			Title: `${i} ${days[date.getDay()]}`
		});
	}
	return newListDays;
	
	
}
