/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";

// Images
import doctor1 from "assets/images/doctor-img01.png";
import doctor2 from "assets/images/doctor-img02.png";
import doctor3 from "assets/images/doctor-img03.png";

function Doctor({ image, name, specialty, status }) {
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
        <SoftBadge variant="gradient" badgeContent={status} color={status === "Available" ? "success" : "secondary"} size="xs" container />
      </SoftBox>
    </SoftBox>
  );
}

const doctorsTableData = {
  columns: [
    { name: "doctor", align: "left" },
    { name: "specialization", align: "left" },
    { name: "status", align: "center" },
    { name: "employed", align: "center" },
    { name: "action", align: "center" },
  ],

  rows: [
    {
      doctor: <Doctor image={doctor1} name="Dr. John Smith" specialty="Cardiology" status="Available" />,
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
        >
          Book Appointment
        </SoftTypography>
      ),
    },
    {
      doctor: <Doctor image={doctor2} name="Dr. Sarah Johnson" specialty="Orthopedics" status="Unavailable" />,
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
        >
          Book Appointment
        </SoftTypography>
      ),
    },
    {
      doctor: <Doctor image={doctor3} name="Dr. Emily Clark" specialty="Pediatrics" status="Available" />,
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
        >
          Book Appointment
        </SoftTypography>
      ),
    },
    // Add more doctors as needed...
  ],
};

export default doctorsTableData;
