import { Form, Formik } from "formik";
import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import BaseInput from "../../../components/atoms/molecules/formik-fields/BaseInput";
import BookingList from "../PartnerBookingList/BookingList";
import SnatchesList from "./SnatchesList";

const Snatches = () => {
  const initialValues = {
    search: "",
  };

  return (
    <Formik initialValues={initialValues} onSubmit={(values) => {}}>
      {({ values }) => {
        return (
          <>
            {/* DESKTOP */}
            <Form className="max-w-full hidden md:block sm:max-w-5xl md:max-w-6xl lg:max-w-[80rem] md:px-4 mx-auto">
              <h2 className="my-8 text-3xl">Snatches</h2>
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
                      placeholder="Name"
                      className="ps-8 w-80 border text-center border-[#BEC8CF] placeholder:text-[#BEC8CF] py-3 rounded-2xl placeholder:text-[15px]"
                    />
                  </div>
                </div>
              </div>

              {/* BOOKING LIST */}
            </Form>

            {/* MOBILE */}
            <Form className="mx-3 mt-4 sm:max-w-5xl md:hidden">
              <div className="mt-4 ">
                <div className="w-full ">
                  <div className="relative">
                    <IoSearchOutline
                      size={23}
                      className="absolute z-10 w-10 h-full px-2 text-white -translate-y-1/2 rounded-lg end-0 bg-mainColor top-1/2"
                    />
                    <BaseInput
                      id="search"
                      name="search"
                      type="text"
                      notEnglith
                      placeholder="Search here"
                      className="ps-8 border border-[#BEC8CF] placeholder:text-[#BEC8CF] py-3 rounded-2xl placeholder:text-[15px]"
                    />
                  </div>
                </div>
              </div>

              {/* BOOKING LIST */}
            </Form>
            <SnatchesList />
          </>
        );
      }}
    </Formik>
  );
};

export default Snatches;
