import { getFilteredEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import { Fragment, useEffect, useState } from "react";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import { useRouter } from "next/router";
import useSWR from "swr";

function FilteredEventsPage() {
  const router = useRouter();
  const filterData = router.query.slug;
  const [loadedEvents, setLoadedEvents] = useState([]);

  const url =
    "https://nextjs-course-5c98a-default-rtdb.firebaseio.com/events.json";
  const fetcher = (apiUrl) => fetch(apiUrl).then((res) => res.json());

  const { data, error } = useSWR(url, fetcher);

  useEffect(() => {
    if (data) {
      const events = [];
      for (const key in data) {
        events.push({ id: key, ...data[key] });
      }
      setLoadedEvents(events);
    }
  }, [data]);

  if (!loadedEvents || !filterData) {
    return <p className="center">Loading...</p>;
  }

  const numYear = +filterData[0];
  const numMonth = +filterData[1];

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <ErrorAlert>
        <p className="center">Invalid filter</p>{" "}
      </ErrorAlert>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p className="center">No events found</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);
  return (
    <Fragment>
      <ResultsTitle date={date} />
      <h1>Filtered Events</h1>
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

export default FilteredEventsPage;
