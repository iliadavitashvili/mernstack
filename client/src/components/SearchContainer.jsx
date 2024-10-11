import { FormRow, FormRowSelect, SubmitBtn } from ".";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, useSubmit, Link } from "react-router-dom";
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from "../../../utils/constants";
import { useAllJobsContext } from "../pages/AllJobs";

const SearchContainer = () => {
  const searchValues = useAllJobsContext();
  const { search, jobsStatus, jobType, sort } = searchValues;
  const submit = useSubmit();
  // console.log(search, jobsStatus, jobType, sort);
  const debounce = (onChange) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      // console.log(form);
      timeout = setTimeout(() => {
        onChange(form);
      }, 1500);
    };
  };
  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">Search Form</h5>
        <div className="form-center">
          <FormRow
            type={"search"}
            name={"search"}
            defaultValue={search}
            // onChange={(e) => submit(e.currentTarget.form)}
            onChange={debounce((form) => {
              submit(form);
            })}
          />
          <FormRowSelect
            onChange={(e) => submit(e.currentTarget.form)}
            labelText={"job status"}
            name={"jobsStatus"}
            list={["all", ...Object.values(JOB_STATUS)]}
            defaultValue={jobsStatus}
          />
          <FormRowSelect
            onChange={(e) => submit(e.currentTarget.form)}
            labelText={"job types"}
            name={"jobType"}
            list={["all", ...Object.values(JOB_TYPE)]}
            defaultValue={jobType}
          />

          <FormRowSelect
            onChange={(e) => submit(e.currentTarget.form)}
            name={"sort"}
            defaultValue={sort}
            list={[...Object.values(JOB_SORT_BY)]}
          />
          <Link to={"/dashboard/all-jobs"} className="btn  form-btn delete-btn">
            Reset search values
          </Link>
          {/* Temp submit button */}
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;
