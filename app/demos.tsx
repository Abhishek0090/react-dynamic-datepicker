"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import DynamicDatepicker, { DatepickerInput, type DatepickerView } from "react-dynamic-datepicker";
import { useTheme } from "./theme";

/** YYYY-MM-DD for today plus `offset` days, in the visitor's timezone. */
function day(offset: number) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toLocaleDateString("en-CA");
}

const events = [
  { id: 1, title: "Team standup", date: day(0), startTime: "09:00", endTime: "09:15" },
  { id: 2, title: "Design review", subtitle: "Room 4B", date: day(0), startTime: "14:00", endTime: "15:00", color: "#db2777" },
  { id: 3, title: "Release day", date: day(2), allDay: true, color: "#d97706" },
  { id: 4, title: "Client call", date: day(3), startTime: "11:30", endTime: "12:00", color: "#16a34a" },
  { id: 5, title: "Sprint planning", date: day(7), startTime: "10:00", endTime: "11:30" },
  { id: 6, title: "Offsite", date: day(-4), allDay: true, color: "#7c3aed" },
  { id: 7, title: "1:1 with Sam", date: day(-1), startTime: "16:00", endTime: "16:30", color: "#0891b2" },
];

function Demo({ title, text, code, children }: { title: string; text: string; code: string; children: ReactNode }) {
  return (
    <section className="demo">
      <h2>{title}</h2>
      <p>{text}</p>
      <div className="demo-body">{children}</div>
      <details>
        <summary>Code</summary>
        <pre>{code.trim()}</pre>
      </details>
    </section>
  );
}

const fmt = (d: Date | null) =>
  d ? d.toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short", year: "numeric" }) : "none";

export default function Demos() {
  const { theme } = useTheme(); // "light" | "dark", from the page toggle
  const [clicked, setClicked] = useState<string>("none");
  const [picked, setPicked] = useState<Date | null>(null);
  const [inputDate, setInputDate] = useState<Date | null>(null);
  const [submitted, setSubmitted] = useState<string>("");
  const [view, setView] = useState<DatepickerView>("month");
  const [controlledDate, setControlledDate] = useState<Date>(new Date());

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(String(new FormData(e.currentTarget).get("date") || "(empty)"));
  };

  return (
    <div className="grid">
      <Demo
        title="Event calendar"
        text="Dots mark busy days. Pick a day to list its events. Make it wider to see titles inside each day."
        code={`
<DynamicDatepicker
  data={events}
  defaultView="month"
  colorScheme={theme}
  onEventClick={(e) => setClicked(String(e.title))}
/>`}
      >
        <DynamicDatepicker data={events} defaultView="month" colorScheme={theme} onEventClick={(e) => setClicked(String(e.title))} />
        <p className="out">Last clicked event: {clicked}</p>
      </Demo>

      <Demo
        title="Date picker with a theme"
        text="Picker mode hides the event UI. One primary color themes the rest."
        code={`
<DynamicDatepicker
  mode="picker"
  defaultView="month"
  colorScheme={theme}
  theme={{ primary: "#0f766e", radius: 20 }}
  onDateChange={setPicked}
/>`}
      >
        <DynamicDatepicker mode="picker" defaultView="month" colorScheme={theme} theme={{ primary: "#0f766e", radius: 20 }} onDateChange={setPicked} />
        <p className="out">Selected: {fmt(picked)}</p>
      </Demo>

      <Demo
        title="Date input in a form"
        text="A form field that opens the calendar in a popover. The name prop posts the date as YYYY-MM-DD."
        code={`
<form onSubmit={onSubmit}>
  <label htmlFor="booking-date">Booking date</label>
  <DatepickerInput
    id="booking-date"
    name="date"
    value={inputDate}
    onChange={setInputDate}
    disablePast
    colorScheme={theme}
    placeholder="Pick a date"
  />
  <button className="btn" type="submit">Submit</button>
</form>`}
      >
        <form className="form" onSubmit={onSubmit}>
          <label htmlFor="booking-date">Booking date</label>
          <DatepickerInput
            id="booking-date"
            name="date"
            value={inputDate}
            onChange={setInputDate}
            disablePast
            colorScheme={theme}
            placeholder="Pick a date"
          />
          <button className="btn" type="submit">Submit</button>
        </form>
        <p className="out">Submitted value: {submitted || "not submitted yet"}</p>
      </Demo>

      <Demo
        title="Custom dark theme"
        text='colorScheme takes "light", "dark" or "auto". The other demos follow the light/dark toggle at the top; this one is always dark with an orange theme.'
        code={`
<DynamicDatepicker
  data={events}
  colorScheme="dark"
  defaultView="week"
  theme={{ primary: "#f97316", background: "#0b1020", text: "#f1f5f9", radius: 12 }}
/>`}
      >
        <DynamicDatepicker
          data={events}
          colorScheme="dark"
          defaultView="week"
          theme={{ primary: "#f97316", background: "#0b1020", text: "#f1f5f9", radius: 12 }}
        />
      </Demo>

      <Demo
        title="Controlled date and view"
        text="Drive the view and selected date from your own state."
        code={`
const [view, setView] = useState("month");
const [date, setDate] = useState(new Date());

<DynamicDatepicker
  data={events}
  view={view}
  onViewChange={setView}
  selectedDate={date}
  onDateChange={setDate}
  weekStartsOn={1}
  formats={{ time: "HH:mm" }}
  colorScheme={theme}
/>`}
      >
        <div className="buttons">
          {(["week", "month", "year"] as const).map((v) => (
            <button key={v} className="btn" type="button" aria-pressed={view === v} onClick={() => setView(v)}>
              {v}
            </button>
          ))}
          <button className="btn" type="button" onClick={() => setControlledDate(new Date())}>
            today
          </button>
        </div>
        <DynamicDatepicker
          data={events}
          view={view}
          onViewChange={setView}
          selectedDate={controlledDate}
          onDateChange={setControlledDate}
          weekStartsOn={1}
          formats={{ time: "HH:mm" }}
          colorScheme={theme}
        />
        <p className="out">
          View: {view}. Date: {fmt(controlledDate)}
        </p>
      </Demo>
    </div>
  );
}
