import { Link, useRouteError } from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage";
import image from "../assets/images/not-found.svg";
function Error() {
  const error = useRouteError();
  console.log(error);
  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={image} alt="not found" />
          <h3>ohh! page not found</h3>
          <p>we cant seem to find the page you look for</p>
          <Link to={"/"}>Home</Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div>
        <h3>something went wrong</h3>
      </div>
    </Wrapper>
  );
}
export default Error;
