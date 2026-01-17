import React, { useState } from "react";
import DashboardLayout from "../DashboardLayout.jsx";
import "../../../stylesheets/Dashboard/ProfileSetting.css";
import { Select, Input, message } from "antd";
import { API_URL } from "../../../store/apiurl.js";
const URL = `${API_URL}/api/v1/vacancy/addVacancy`;

const { TextArea } = Input;

const AddVacancy = () => {
  const token = localStorage.getItem("token");
  let userDataString = localStorage.getItem('userData');

  // Step 2: Parse the JSON string to a JavaScript object
  let userData = null;
  
  // Step 3: Access the _id field
  let userId = "";
  
  if (userDataString) {
    try {
      userData = JSON.parse(userDataString);
      userId = userData._id || "";
    } catch (error) {
      // Error parsing user data
    }
  }
  
  if (!userId) {
    message.error("User ID is missing. Please log in again.");
  }

  const [formData, setFormData] = useState({
    requirements: [],
  });

  const handleChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const formattedData = {
        position: event.target.elements.position.value,
        company: event.target.elements.company.value,
        location: event.target.elements.location.value,
        salary: event.target.elements.salary.value,
        requirements: formData.requirements,
        alumni_id: userId,//in this line thare we have to change by user id
        description: event.target.elements.description.value,
         // Assuming the alumni_id is fixed for this example
      };

      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        event.target.reset(); // Clear the form
        message.success("Job posted successfully!");
      } else {
        const errorData = await response.json();
        message.error("Could not post job: " + errorData.message);
      }
    } catch (error) {
      message.error("An error occurred while posting the job. Please try again later.");
    }
  };

  const options = [
    "Bachelor's degree in Computer Science or related field",
    "Proficiency in Java and Spring Framework",
    "Excellent communication skills",
    "PHP",
    "Python",
    "JavaScript",
    "React.js",
    "Node.js",
    "Data Structures",
    "Algorithms",
    "HTML",
    "CSS",
    "Redux",
    "Express.js",
    "MongoDB",
    "SQL",
    "RESTful APIs",
    "GraphQL",
    "TypeScript",
    "C++",
    "C#",
    "Ruby on Rails",
    "Git",
    "Version Control",
    "Docker",
    "Kubernetes",
    "Microservices",
    "Machine Learning",
    "Artificial Intelligence",
    "Deep Learning",
    "TensorFlow",
    "Keras",
    "Natural Language Processing (NLP)",
    "Computer Vision",
    "Big Data",
    "Hadoop",
    "Spark",
    "Cloud Computing",
    "AWS",
    "Azure",
    "Google Cloud Platform",
    "DevOps",
    "CI/CD",
    "Jenkins",
    "Agile Methodologies",
    "Scrum",
    "Project Management",
    "Cybersecurity",
    "Cryptography",
    "Blockchain",
    "Mobile App Development",
    "Android Development",
    "iOS Development",
    "Flutter",
    "React Native",
    "Test-Driven Development (TDD)",
    "Unit Testing",
    "Integration Testing",
    "Automation Testing",
    "Performance Optimization",
    "Software Design Patterns",
    "Object-Oriented Programming (OOP)",
    "Functional Programming",
    "Multithreading",
    "Concurrency",
    "Networking",
    "Operating Systems",
    "Linux",
    "Unix",
    "Shell Scripting",
    "System Design",
    "Database Design",
    "API Design",
    "UML",
    "Web Development",
    "Front-End Development",
    "Back-End Development",
    "Full-Stack Development",
    "Responsive Web Design",
    "User Experience (UX) Design",
    "User Interface (UI) Design",
    "Wireframing",
    "Prototyping",
    "Accessibility",
    "Cross-Browser Compatibility",
    "Web Performance",
    "Search Engine Optimization (SEO)",
    "Content Management Systems (CMS)",
    "WordPress",
    "Joomla",
    "Drupal",
    "E-commerce Platforms",
    "WooCommerce",
    "Shopify",
    "Magento",
    "Version Control",
    "GitHub",
    "GitLab",
    "Bitbucket",
  ].map((requirement) => ({
    value: requirement,
    label: requirement,
  }));
  

  return (
    <DashboardLayout>
      <div className="profile-setting" style={{ marginBottom: "10rem" }}>
        <div className="w-100 mb-3 rounded mb-5 p-2">
          <h5 className="text-title mb-5 mt-3">Job Post</h5>
          <form className="row form-row" onSubmit={onSubmit}>
            <div className="col-md-6">
              <div className="form-group mb-2 card-label">
                <label className="label-style">
                  Position <span className="text-danger">*</span>
                </label>
                <input
                  className="text-input-field"
                  placeholder="Position"
                  type="text"
                  name="position"
                  required
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group mb-2 card-label">
                <label className="label-style">
                  Company <span className="text-danger">*</span>
                </label>
                <input
                  className="text-input-field"
                  placeholder="Company"
                  type="text"
                  name="company"
                  required
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group mb-2 card-label">
                <label className="label-style">
                  Location <span className="text-danger">*</span>
                </label>
                <input
                  className="text-input-field"
                  placeholder="Location"
                  type="text"
                  name="location"
                  required
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group mb-2 card-label">
                <label className="label-style">
                  Salary <span className="text-danger">*</span>
                </label>
                <input
                  className="text-input-field"
                  placeholder="Salary"
                  type="text"
                  name="salary"
                  required
                />
              </div>
            </div>

            <div className="form-group mb-2 card-label">
              <label className="label-style">
                Requirements <span className="text-danger">*</span>
              </label>
              <Select
                mode="multiple"
                placeholder="Select Requirements"
                onChange={(value) => handleChange(value, "requirements")}
                options={options}
                style={{ width: "100%" }}
                required
              />
            </div>

            <div className="col-md-12">
              <div className="form-group mb-2 card-label">
                <label className="label-style">
                  Description <span className="text-danger">*</span>
                </label>
                <TextArea
                  className="text-input-field"
                  rows={5}
                  placeholder="Description"
                  name="description"
                  required
                />
              </div>
            </div>

            <div className="text-center">
              <button type="submit" className="btn my-3">
                Post Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddVacancy;
