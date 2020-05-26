import { createConsumer } from "@rails/actioncable";

const consumer = createConsumer(`http://localhost:3001/cable`);

export default consumer;