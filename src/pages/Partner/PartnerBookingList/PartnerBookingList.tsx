import { Field, Form, Formik } from "formik";
import { IoSearchOutline } from "react-icons/io5";
import BaseInput from "../../../components/atoms/molecules/formik-fields/BaseInput";
import BaseSelect from "../../../components/atoms/molecules/formik-fields/BaseSelect";
import { DesignCourseSelect } from "../../DesignCourse/DesignCourseForm";
import BookingList from "./BookingList";
import { CiFilter } from "react-icons/ci";
import { useState } from "react";
import MainPopup from "../../../components/UI/MainPopup";
import Button from "../../../components/atoms/Button/Button";

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
  const [showFilterPopup, setShowFilterPopup] = useState(false);

  const initialValues = {
    search: "",
    state: "showAll",
    user: "showAllUsers",
  };

  return (
    <Formik initialValues={initialValues} onSubmit={(values) => {}}>
      {({ values }) => {
        return (
          <div>
            {/* // Desktop */}
            <div className="hidden md:block">
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
            </div>

            {/* // Mobile */}
            <div className="md:hidden">
              <Form className="mx-3 mt-4 sm:max-w-5xl">
                <div className="grid items-center w-full grid-cols-6 gap-4">
                  <div className="relative col-span-5">
                    <IoSearchOutline
                      size={23}
                      className="absolute z-10 w-10 h-full px-2 text-white -translate-y-1/2 rounded-lg end-0 bg-mainColor top-1/2"
                    />
                    <BaseInput
                      id="search"
                      name="search"
                      type="text"
                      notEnglith
                      placeholder="Name or ID Number"
                      className="ps-8 border border-[#BEC8CF] placeholder:text-[#BEC8CF] py-3 rounded-2xl placeholder:text-[15px]"
                    />
                  </div>
                  <div
                    onClick={() => setShowFilterPopup(true)}
                    className="flex items-center justify-center h-full border rounded-lg cursor-pointer cols-1 border-mainColor"
                  >
                    <CiFilter className="text-3xl text-mainColor" />
                  </div>
                </div>

                {/* BOOKING LIST */}
              </Form>
              <BookingList />

              {/* FILTER IN MOBILE */}
              {showFilterPopup && (
                <>
                  <div
                    onClick={() => setShowFilterPopup(false)}
                    className="fixed top-0 left-0 z-[99999] w-full h-full bg-black/30"
                  ></div>
                  <div className="w-[90%] h-[80vh] z-[999999] fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-white rounded-xl p-4">
                    <Form>
                      {/* State Radio Buttons */}
                      <div className="mb-4">
                        <h3 className="mb-6 text-lg">State</h3>
                        <div className="flex flex-col">
                          {sortOption.map((option) => (
                            <label
                              key={option.id}
                              className="flex items-center gap-4 mb-6"
                            >
                              <Field
                                type="radio"
                                name="state"
                                value={option.value}
                                className="text-mainColor "
                              />
                              <span className="text-black/90">
                                {option.label}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* User Radio Buttons */}
                      <div className="mb-4">
                        <h3 className="mb-6 text-lg">Users</h3>
                        <div className="flex flex-col">
                          {filterOption.map((user) => (
                            <label
                              key={user.id}
                              className="flex items-center gap-4 mb-6"
                            >
                              <Field
                                type="radio"
                                name="user"
                                value={user.value}
                                className="text-mainColor"
                              />
                              <span className="text-black/90">
                                {user.label}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button
                          type="button"
                          action={() => setShowFilterPopup(false)}
                          className="py-2 mt-4"
                        >
                          Apply
                        </Button>
                      </div>
                    </Form>
                  </div>
                </>
              )}
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default PartnerBookingList;
