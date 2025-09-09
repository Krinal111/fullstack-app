import { useEffect, useState } from "react";
import { dispatch, useSelector, type AppState } from "../../redux/store";
import type { UserUpdateInterface } from "../../types/authTypes";
import { setSuccess } from "../../redux/slices/authSlices";
import { Button, Form, Input, message, Modal } from "antd";
import { editUserProfileAction } from "../../redux/actions/userAction"; // ✅ fix typo
import PhoneField from "../Phonefield";
import { isValidPhoneNumber } from "react-phone-number-input";

const ViewProfileModal = ({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen(v: string): void;
}) => {
  const { userData, success } = useSelector((state: AppState) => state.auth);
  const [edit, setEdit] = useState<boolean>(false);

  const [initialFormValues, setInitialFormValues] =
    useState<UserUpdateInterface>({});
  const [form] = Form.useForm();

  useEffect(() => {
    if (success) {
      form.resetFields();
      setIsModalOpen("");
      setEdit(false);
      dispatch(setSuccess(false));
    }
  }, [success]);

  const handleClose = (): void => {
    setIsModalOpen("");
    setEdit(false);
    form.resetFields();
  };

  const formData = (data: UserUpdateInterface): UserUpdateInterface => ({
    name: data.name,
    phone_number: data.phone_number,
  });

  const onFinish = async (data: UserUpdateInterface): Promise<void> => {
    if (edit) {
      const previosValues = formData(initialFormValues);
      const currentValues = formData(data);

      if (JSON.stringify(previosValues) === JSON.stringify(currentValues)) {
        console.log("No data changes found for edit profile");
        message.info("No data changes found");
        return;
      }

      if (!data.phone_number) {
        data.phone_number = "";
      }

      // ✅ send both name and phone_number
      await editUserProfileAction(userData?.id, {
        name: data.name,
        phone_number: data.phone_number,
      });
    }
  };

  useEffect(() => {
    if (userData) {
      form.setFieldsValue({ ...userData });
      setInitialFormValues({ ...userData });
    }
  }, [isModalOpen]);

  return (
    <Modal
      title="User Profile"
      footer={null}
      centered
      open={isModalOpen}
      onCancel={handleClose}
      width={350}
    >
      <div className="my-1">
        <div className="my-3 flex gap-2 items-center">
          <h2 className="capitalize text-gray-60 font-bold">Username :</h2>
          <h3>{userData?.user_name}</h3>
        </div>
        <Form
          form={form}
          name="basic"
          onFinish={onFinish}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item label="" name="name">
            <Input placeholder="Enter name" disabled={!edit} />
          </Form.Item>

          <Form.Item
            label=""
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
              placeholder="Enter phone number"
              disabled={!edit}
              className={`${!edit ? "disable-phone-input" : ""} phone-input`}
              international
              limitMaxLength
            />
          </Form.Item>

          {edit && (
            <div className="flex justify-end items-center -mb-5 mt-8 gap-2">
              <Button
                htmlType="button"
                className="!font-semibold"
                onClick={() => handleClose()}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="!font-semibold"
              >
                Update
              </Button>
            </div>
          )}
        </Form>
        {!edit && (
          <div className="flex justify-end items-center -mb-5 mt-5 gap-2">
            <Button
              type="primary"
              htmlType="button"
              className="!font-semibold"
              onClick={() => setEdit(true)}
            >
              Edit
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ViewProfileModal;
