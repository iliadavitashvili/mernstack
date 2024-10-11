import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";

import customFetch from "../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/jobs", data);
    toast.success("Job Added SuccessFully");
    return redirect("all-jobs");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    // return redirect("/");
  }
  console.log(data);
  return null;
};

function AddJob() {
  const { user } = useOutletContext();

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">add job</h4>
        <div className="form-center">
          <FormRow type={"text"} name={"position"} />
          <FormRow type={"text"} name={"company"} />
          <FormRow
            type={"text"}
            name={"jobLocation"}
            labelText={"job locations"}
            defaultValue={user?.location}
          />
          <FormRowSelect
            defaultValue={JOB_STATUS.PENDING}
            labelText="job status"
            name={"jobStatus"}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            defaultValue={JOB_TYPE.Full_TIME}
            labelText="job type"
            name={"jobType"}
            list={Object.values(JOB_TYPE)}
          />
          <SubmitBtn formBtn />
          {/* <button
            type="submit"
            className="btn btn-block btn-form"
            disabled={isSubmitting}
          >
            {isSubmitting ? "submitting..." : "submit"}
          </button> */}
        </div>
      </Form>
    </Wrapper>
  );
}
export default AddJob;
