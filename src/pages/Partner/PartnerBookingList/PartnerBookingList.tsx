import { Form, Formik } from "formik";
import { IoSearchOutline } from "react-icons/io5";
import BaseInput from "../../../components/atoms/molecules/formik-fields/BaseInput";
import BaseSelect from "../../../components/atoms/molecules/formik-fields/BaseSelect";
import { DesignCourseSelect } from "../../DesignCourse/DesignCourseForm";
import BookingList from "./BookingList";

const sortOption = [
  { id: 1, label: "Show All", value: "showAll" },
  { id: 2, label: "Confirmed", value: "confirmed" },
  { id: 3, label: "PSrtaocceeysMsainKcg", value: "psrtaocceeysMsainKcg" },
  { id: 4, label: "New requests", value: "newRequests" },
  { id: 5, label: "NoAvailability", value: "noAvailability" },
];
const filterOption = [
  { id: 1, label: "All Bookings", value: "allBookings" },
  { id: 2, label: "Stacey MaKcre", value: "Stacey MaKcre" },
  { id: 3, label: "Jake Daiel", value: "Jake Daiel" },
];

const PartnerBookingList = () => {
  const initialValues = {
    search: "",
  };

  return (
    <Formik initialValues={initialValues} onSubmit={(values) => {}}>
      {({ values }) => {
        return (
          <>
            <Form className="max-w-full sm:max-w-5xl md:max-w-6xl lg:max-w-[80rem] md:px-4 mx-auto">
              <h2 className="my-8 text-3xl">Booking list</h2>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-12">
                  <div className="relative flex items-center w-full">
                    <IoSearchOutline
                      size={23}
                      className="absolute z-10 -translate-y-1/2 top-1/2 start-6"
                    />
                    <BaseInput
                      id="search"
                      name="search"
                      type="text"
                      notEnglith
                      placeholder="Name or ID Number"
                      className="ps-8 w-80 border text-center border-[#BEC8CF] placeholder:text-[#BEC8CF] py-3 rounded-2xl placeholder:text-[15px]"
                    />
                  </div>
                  <div>
                    <BaseSelect
                      id="sort"
                      name="sort"
                      options={sortOption}
                      onChange={(option) => {}}
                      className="w-64 text-center text-black"
                      selectStyle={DesignCourseSelect}
                    />
                  </div>
                </div>
                <div>
                  <BaseSelect
                    id="filter"
                    name="filter"
                    options={filterOption}
                    onChange={(option) => {}}
                    className="w-64 text-center text-black"
                    selectStyle={DesignCourseSelect}
                  />
                </div>
              </div>

              {/* BOOKING LIST */}
            </Form>
            <BookingList />
          </>
        );
      }}
    </Formik>
  );
};

export default PartnerBookingList;
