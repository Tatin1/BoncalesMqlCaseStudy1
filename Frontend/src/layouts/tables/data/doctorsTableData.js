import React, { useState } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// Images
import doctor1 from "assets/images/doctor-img01.png";
import doctor2 from "assets/images/doctor-img02.png";
import doctor3 from "assets/images/doctor-img03.png";

// Import PropTypes for prop validation
import PropTypes from "prop-types";

function Doctor({ image, name, specialty, status }) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleBookAppointment = () => {
    setShowDatePicker(true);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setShowDatePicker(false); // Close date picker after selection
  };

  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox mr={2}>
        <SoftAvatar src={image} alt={name} size="sm" variant="rounded" />
      </SoftBox>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {name}
        </SoftTypography>
        <SoftTypography variant="caption" fontWeight="medium">
          {specialty}
        </SoftTypography>
        <SoftBadge
          variant="gradient"
          badgeContent={status}
          color={status === "Available" ? "success" : "secondary"}
          size="xs"
          container
        />
      </SoftBox>
      <SoftBox ml="auto">
        <SoftTypography
          component="a"
          href="#book-appointment"
          variant="caption"
          color="secondary"
          fontWeight="medium"
          onClick={handleBookAppointment}
        >
          Book Appointment
        </SoftTypography>
        {showDatePicker && (
          <DatePicker
            selected={selectedDate}
            onChange={handleDateSelect}
            minDate={new Date()}
            inline
          />
        )}
      </SoftBox>
    </SoftBox>
  );
}

// PropTypes validation for Doctor component
Doctor.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  specialty: PropTypes.string.isRequired,
  status: PropTypes.oneOf(["Available", "Unavailable"]).isRequired,
};

// Sample data for the table
const doctorsTableData = {
  columns: [
    { name: "doctor", align: "left" },
    { name: "specialization", align: "left" },
    { name: "status", align: "center" },
    { name: "employed", align: "center" },
    { name: "action", align: "center" }, // "action" column
  ],
  rows: [
    {
      doctor: (
        <Doctor
          image={doctor1}
          name="Dr. John Smith"
          specialty="Cardiology"
          status="Available"
        />
      ),
      specialization: "Cardiologist",
      status: "Available",
      employed: "2019",
      action: (
        <SoftTypography
          component="a"
          href="#book-appointment"
          variant="caption"
          color="secondary"
          fontWeight="medium"
          onClick={(e) => {
            e.preventDefault(); // Prevent default anchor behavior
            console.log("Book appointment clicked for Dr. John Smith");
            handleBookAppointment(); // Trigger appointment booking
          }}
        >
          Book Appointment
        </SoftTypography>
      ),
    },
    {
      doctor: (
        <Doctor
          image={doctor2}
          name="Dr. Sarah Johnson"
          specialty="Orthopedics"
          status="Unavailable"
        />
      ),
      specialization: "Orthopedist",
      status: "Unavailable",
      employed: "2018",
      action: (
        <SoftTypography
          component="a"
          href="#book-appointment"
          variant="caption"
          color="secondary"
          fontWeight="medium"
          onClick={() => console.log("Book appointment clicked for Dr. Sarah Johnson")}
        >
          Book Appointment
        </SoftTypography>
      ),
    },
    {
      doctor: (
        <Doctor
          image={doctor3}
          name="Dr. Emily Clark"
          specialty="Pediatrics"
          status="Available"
        />
      ),
      specialization: "Pediatrician",
      status: "Available",
      employed: "2020",
      action: (
        <SoftTypography
          component="a"
          href="#book-appointment"
          variant="caption"
          color="secondary"
          fontWeight="medium"
          onClick={() => console.log("Book appointment clicked for Dr. Emily Clark")}
        >
          Book Appointment
        </SoftTypography>
      ),
    },
    // Add more doctors as needed...
  ],
};

export default doctorsTableData;
