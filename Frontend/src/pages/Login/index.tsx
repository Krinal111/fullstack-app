import { useState } from "react";
import { Form } from "antd";
import Button from "../../components/Button";
import PhoneField from "../../components/Phonefield";
import PasswordField from "../../components/PasswordField";
import { isValidPhoneNumber } from "react-phone-number-input";
import { loginAction } from "../../redux/actions/authAction";
import { useNavigate } from "react-router-dom";

function Login() {
  const [currentStep, setCurrentStep] = useState<"phone" | "password">("phone");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [phoneForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const navigate = useNavigate();
  // Watch form fields for button state
  const phoneValue = Form.useWatch("phone_number", phoneForm);

  const handlePhoneSubmit = (values: any) => {
    setPhoneNumber(values.phone_number);
    setCurrentStep("password");
  };

  const handlePasswordSubmit = (values: any) => {
    loginAction(
      {
        phone_number: phoneNumber,
        password: values.password,
      },
      navigate
    );
  };

  const handleBackToPhone = () => {
    setCurrentStep("phone");
    passwordForm.resetFields();
  };

  const isPhoneValid = phoneValue && isValidPhoneNumber(phoneValue);

  const renderPhoneStep = () => (
    <div className="bg-white py-12 px-10 flex flex-col justify-center">
      <div className="mb-8">
        <h3 className="text-[24px] mb-2 text-secondary text-center font-semibold">
          Login
        </h3>
        <p className="text-[15px] text-gray-60">
          Please enter your mobile number to continue!
        </p>
      </div>

      <div className="space-y-5">
        <Form
          form={phoneForm}
          onFinish={handlePhoneSubmit}
          layout="vertical"
          autoComplete="on"
        >
          <Form.Item
            name="phone_number"
            rules={[
              {
                required: true,
                message: "Please enter your Mobile Number",
              },
              {
                validator: (_, value) => {
                  if (value && !isValidPhoneNumber(value)) {
                    return Promise.reject("Please enter a valid Mobile Number");
                  }
                  return Promise.resolve();
                },
              },
            ]}
            validateTrigger={["onChange", "onBlur"]}
          >
            <PhoneField
              label="Phone Number"
              placeholder="Enter Your Mobile Number"
              className="phone-input"
              required
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            disabled={!isPhoneValid}
            className="w-full !font-semibold !text-sm !py-2 mt-2 !disabled:bg-primary/50"
          >
            Continue
          </Button>
        </Form>
      </div>
    </div>
  );

  const renderPasswordStep = () => (
    <div className="bg-white py-12 px-10 flex flex-col justify-center">
      <div className="mb-8">
        <h3 className="text-[24px] mb-2 text-primary text-center font-semibold">
          Enter Password
        </h3>
        <p className="text-[15px] text-gray-60">
          Enter password for {phoneNumber}
        </p>
      </div>

      <div className="space-y-5">
        <Form
          form={passwordForm}
          onFinish={handlePasswordSubmit}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your password",
              },
            ]}
            validateTrigger={["onChange", "onBlur"]}
          >
            <PasswordField
              label="Password"
              placeholder="Enter your password"
              className="password-input"
              required
            />
          </Form.Item>

          <div className="flex gap-3 mt-6">
            <Button
              type="default"
              onClick={handleBackToPhone}
              size="large"
              className="flex-1 !font-semibold !text-sm !py-2 !disabled:bg-primary/20"
            >
              Back
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="flex-1 !font-semibold !text-sm !py-2"
            >
              Login
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );

  return (
    <div className="w-full h-screen flex items-center justify-center login-main">
      <div className="flex-col h-auto">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="max-w-[1200px] overflow-hidden shadow-[0px_0px_20px_-11px_rgba(255,173,144,1)] flex rounded-2xl border border-primary/30">
            {currentStep === "phone" ? renderPhoneStep() : renderPasswordStep()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
