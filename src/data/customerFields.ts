import { HiOutlineBuildingOffice2, HiOutlineEnvelope, HiOutlineMapPin, HiOutlinePhone, HiOutlineUser } from 'react-icons/hi2'
import type { CustomerFieldDefinition } from '../components/store/CustomerField'
export const checkoutFields = {
  firstName: { id: "order-firstName", label: "First Name", type: "text", placeholder: "John", required: true, icon: HiOutlineUser },
  lastName: { id: "order-lastName", label: "Last Name", type: "text", placeholder: "Smith", required: true, icon: HiOutlineUser },
  email: { id: "order-email", label: "Work Email", type: "email", placeholder: "john.smith@company.com", required: true, icon: HiOutlineEnvelope },
  phone: { id: "order-phone", label: "Phone / Mobile", type: "tel", placeholder: "+20 1xx xxx xxxx", required: true, icon: HiOutlinePhone },
  company: { id: "order-company", label: "Company / Organization", type: "text", placeholder: "e.g. Arab Contractors, Eni, Petrojet...", required: false, hint: "(Optional)", icon: HiOutlineBuildingOffice2 },
  address: { id: "order-address", label: "Delivery Address / Facility Location", type: "text", placeholder: "Facility name, Street, City, Country", required: true, icon: HiOutlineMapPin }
} satisfies Record<string, CustomerFieldDefinition>

export const quoteFields = {
  firstName: { id: "modal-firstName", label: "First Name", type: "text", placeholder: "e.g. John", required: true },
  lastName: { id: "modal-lastName", label: "Last Name", type: "text", placeholder: "e.g. Smith", required: true },
  email: { id: "modal-email", label: "Email Address", type: "email", placeholder: "name@company.com", required: true },
  phone: { id: "modal-phone", label: "Phone Number", type: "tel", placeholder: "+20 1xx xxx xxxx", required: true },
  address: { id: "modal-address", label: "Address / Delivery Location", type: "text", placeholder: "Company name, Street address, City, Country", required: true }
} satisfies Record<string, CustomerFieldDefinition>
