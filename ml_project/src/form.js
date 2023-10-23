import React, { useState } from 'react';
import "./App.css"
import { Form, Button, Input, Typography, Modal } from 'antd';

const FormComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [prediction, setPrediction] = useState({});

  
  const showModal = () => {
    if (Object.keys(formData).length === 8) {
    setIsModalOpen(true);
    console.log(formData);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    };
    fetch("http://127.0.0.1:5000/predict", requestOptions)
    .then(response => response.json())
    .then(result => {setPrediction(result); console.log(result);})
    .catch(error => console.log('error', error))
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (event) => { 
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setFormData({ ...formData, [name]: parseFloat(value) });
    event.preventDefault();
  };

  
  return (
    <div className="appBg">
      <Form className="form">
        <Typography.Title level={2}>Diabetes Prediction</Typography.Title>
        <Form.Item
          label="Pregnancies"
          name={"Pregnancies"}
          rules={[{ required: true }]}
        >
          <Input name="Pregnancies" onChange={handleInputChange} />
        </Form.Item>
        <Form.Item
          label="Glucose"
          name={"Glucose"}
          rules={[{ required: true }]}
        >
          <Input name="Glucose" onChange={handleInputChange} />
        </Form.Item>
        <Form.Item
          label="Blood Pressure "
          name={"BloodPressure"}
          rules={[{ required: true }]}
        >
          <Input onChange={handleInputChange} name="BloodPressure" />
        </Form.Item>
        <Form.Item
          label="Skin Thickness "
          name={"SkinThickness"}
          rules={[{ required: true }]}
        >
          <Input onChange={handleInputChange} name="SkinThickness" />
        </Form.Item>
        <Form.Item
          label="Insulin "
          name={"Insulin"}
          rules={[{ required: true }]}
        >
          <Input onChange={handleInputChange} name="Insulin" />
        </Form.Item>
        <Form.Item label="BMI " name={"BMI"} rules={[{ required: true }]}>
          <Input onChange={handleInputChange} name="BMI" />
        </Form.Item>
        <Form.Item
          label="Diabetes Pedigree Function "
          name={"DPF"}
          rules={[{ required: true }]}
        >
          <Input onChange={handleInputChange} name="DPF" />
        </Form.Item>
        <Form.Item label="Age " name={"Age"} rules={[{ required: true }]}>
          <Input onChange={handleInputChange} name="Age" />
        </Form.Item>
        <Button
          textHoverBg="#026241"
          className="button"
          type="primary"
          htmlType="submit"
          onClick={() => {
            showModal();
          }}
          block
        >
          Submit
        </Button>
        <Modal
          title="Results"
          open={isModalOpen}
          onOk={() => {
            handleOk();
          }}
          onCancel={handleCancel}
        >
          <p>{prediction["prediction"]}</p>
        </Modal>
      </Form>
    </div>
  );
};

export default FormComponent;
