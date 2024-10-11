import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData, useParams } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useNavigation } from "react-router-dom";
export const loader = async ({ params }) => {
  console.log(params);
  try {
    const { data } = await customFetch.get(`/jobs/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect("/dashboard/all-jobs");
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  // const asd = await customFetch.get(`/jobs/${params}`);
  // console.log(asd);
  try {
    await customFetch.patch(`/jobs/${params.id}`, data);
    toast.success("Job Edited SuccessFully");
    return redirect("/dashboard/all-jobs");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

function EditJob() {
  const { job } = useLoaderData();
  console.log(job.jobStatus);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Edit Job</h4>
        <div className="form-center">
          <FormRow
            type={"text"}
            name={"position"}
            defaultValue={job.position}
          />
          <FormRow type={"text"} name={"company"} defaultValue={job.company} />
          <FormRow
            type={"text"}
            name={"jobLocation"}
            defaultValue={job.jobLocation}
            labelText={"job location"}
          />
          <FormRowSelect
            name={"jobStatus"}
            labelText={"job status"}
            defaultValue={job.jobStatus}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            name={"jobType"}
            labelText={"job type"}
            defaultValue={job.jobType}
            list={Object.values(JOB_TYPE)}
          />
        </div>
        <SubmitBtn formBtn />
      </Form>
    </Wrapper>
  );
}
export default EditJob;
