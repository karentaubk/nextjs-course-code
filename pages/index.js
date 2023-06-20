import { Fragment } from "react";
import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../dummy-data";

function HomePage() {
  const featuredEvents = getFeaturedEvents();
  return (
    <Fragment>
      <h1>The Home Page</h1>
      <EventList items={featuredEvents} />
    </Fragment>
  );
}
export default HomePage;
