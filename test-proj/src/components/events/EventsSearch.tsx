import { FormEventHandler, useRef } from "react";
import Button from "../ui/button";
import classes from "./event-search.module.css";
import { useRouter } from "next/router";

function EventsSearch({onSearch}: {onSearch: (y: string, m: string) => {}}) {
    const yearRef = useRef<HTMLSelectElement>(null);
    const monthRef = useRef<HTMLSelectElement>(null);

    const submitHandler: FormEventHandler = (event) => {
        event.preventDefault();
        const year = yearRef.current!.value;
        const month = monthRef.current!.value;
        onSearch(year, month);
    }

    return <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.controls}>
            <div className={classes.control}>
                <label htmlFor="year">Year</label>
                <select id="year" ref={yearRef}>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                </select>
            </div>
            <div className={classes.control}>
                <label htmlFor="month">Month</label>
                <select id="month" ref={monthRef}>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </select>
            </div>
        </div>
        <Button>Find Events</Button>
    </form>
}
export default EventsSearch;