import app from "./app.js";
import { PORT } from "./constants/constants.js";

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
