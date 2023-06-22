import { Fragment } from "react";
import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-util";

function HomePage(props) {
  return (
    <Fragment>
      <h1>The Home Page</h1>
      <EventList items={props.featuredEvents} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: { featuredEvents },
    revalidate: 1800,
  };
}

export default HomePage;
