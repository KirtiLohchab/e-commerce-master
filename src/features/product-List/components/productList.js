//discountPercentage= {math.round(product.price*(1-product.discountPercentage/100))}

import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllProducts,
  fetchProductsByFiltersAsync,
  selectTotalItems,
} from "../productSlice";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";
import { FaCartPlus, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ITEMS_PER_PAGE } from "../../../app/constants";
const sortOptions = [
  { name: "Best Rating", order: "desc", current: false },
  { name: "Price: Low to High", order: "asc", current: false },
  { name: "Price: High to Low", order: "desc", current: false },
];

const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "Purple", label: "Purple", ckecked: false },
      { value: "Blue", label: "Blue", ckecked: false },
      { value: "Pink", label: "Pink", ckecked: false },
      { value: "Wine", label: "Wine", ckecked: false },
      { value: "Orange", label: "Orange", ckecked: false },
      { value: "Green", label: "Green", ckecked: false },
      { value: "Cream", label: "Cream", ckecked: false },
      { value: "Black", label: "Black", ckecked: false },
      { value: "Grey", label: "Grey", ckecked: false },
      { value: "Golden", label: "Golden", ckecked: false },
      { value: "Brown", label: "Brown", ckecked: false },
      { value: "Yellow", label: "Yellow", ckecked: false },
    ],
  },
  {
    id: "category",
    name: "Category",
    options: [
      { value: "Anarkali", label: "Anarkali", ckecked: false },
      { value: "Kurta", label: "Kurta", ckecked: false },
      { value: "Saree", label: "Saree", ckecked: false },
      { value: "Lehenga", label: "Lehenga", ckecked: false },
      { value: "Dress", label: "Dress", ckecked: false },
      { value: "Bottom", label: "Bottom", ckecked: false },
      { value: "Jacket", label: "Jacket", ckecked: false },
      { value: "Skirt", label: "Skirt", ckecked: false },
      { value: "Top", label: "Top", ckecked: false },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "sx", label: " SX", checked: false },
      { value: "s", label: "S", checked: false },
      { value: "m", label: "M", checked: false },
      { value: "l", label: "L", checked: false },
      { value: "xl", label: "XL", checked: false },
      { value: "xxl", label: "XXL", checked: true },
      { value: "3xl", label: "3XL", checked: true },
    ],
  },
  {
    id: "brand",
    name: "Brand",
    options: [
      { value: "Anayna", label: "Anayna", ckecked: false },
      { value: "Kalini", label: "Kalini", ckecked: false },
      { value: "Anouk", label: "Anouk", ckecked: false },
      { value: "Singni", label: "Singni", ckecked: false },
      { value: "Indo Era", label: "Indo Era", ckecked: false },
      { value: "Sangria", label: "Sangria", ckecked: false },
      { value: "Off Duty India", label: "Off Duty India", ckecked: false },
      { value: "vero moda", label: "vero moda", ckecked: false },
      { value: "Forever New", label: "Forever New", ckecked: false },
      { value: "Cover Story", label: "Cover Story", ckecked: false },
      { value: "Cider", label: "Cider", ckecked: false },
      { value: "Aaheli", label: "Aaheli", ckecked: false },
      { value: "FableStreet", label: "FableStreet", ckecked: false },
      { value: "Moomaya", label: "Moomaya", ckecked: false },
      {
        value: "Label Ritu Kumar",
        label: "Label Ritu Kumar",
        ckecked: false,
      },
      { value: "SHAYE", label: "SHAYE", ckecked: false },
      { value: "MISH", label: "MISH", ckecked: false },
      { value: "Style Quotient", label: "Style Quotient", ckecked: false },
      { value: "QOMN", label: "QOMN", ckecked: false },
      { value: "RSVP", label: "RSVP", ckecked: false },
      { value: "BLACK SCISSOR", label: "BLACK SCISSOR", ckecked: false },
      { value: "LIKHA", label: "LIKHA", ckecked: false },
      { value: "Stylum", label: "Stylum", ckecked: false },
      { value: "AAHELI", label: "AAHELI", ckecked: false },
      { value: "TANKHI", label: "TANKHI", ckecked: false },
      { value: "Miss Chase", label: "Miss Chase", ckecked: false },
      { value: "KOTON", label: "KOTON", ckecked: false },
      { value: "TALLY WEIJL", label: "TALLY WEIJL", ckecked: false },
      { value: "DOLCE CRUDO", label: "DOLCE CRUDO", ckecked: false },
      { value: "Libas", label: "Libas", ckecked: false },
      { value: "Bhama Couture", label: "Bhama Couture", ckecked: false },
      { value: "all about you", label: "all about you", ckecked: false },
      { value: "Khushal K", label: "Khushal K", ckecked: false },
      { value: "Rain & Rainbow", label: "Rain & Rainbow", ckecked: false },
      { value: "GORGONE", label: "GORGONE", ckecked: false },
      { value: "Varanga", label: "Varanga", ckecked: false },
      { value: "Ishin", label: "Ishin", ckecked: false },
      { value: "BAESD", label: "BAESD", ckecked: false },
    ],
  },
];

export default function ProductList() {
  const dispatch = useDispatch();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const products = useSelector(selectAllProducts);
  const totalItems = useSelector(selectTotalItems);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const [page, setPage] = useState(1);
  const handleFilter = (e, section, option) => {
    console.log(e.target.checked);
    const newFilter = { ...filter };
    if (e.target.checked) {
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value);
      } else {
        newFilter[section.id] = [option.value];
      }
    } else {
      const index = newFilter[section.id].findIndex(
        (el) => el === option.value
      );
      newFilter[section.id].splice(index, 1);
    }
    console.log({ newFilter });

    setFilter(newFilter);
  };

  const handleSort = (e, option) => {
    const sort = { _sort: option.sort, _order: option.order };
    console.log({ sort });
    setSort(sort);
  };

  const handlePage = (page) => {
    console.log({ page });
    setPage(page);
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchProductsByFiltersAsync({ filter, sort, pagination }));
  }, [dispatch, filter, sort, page]);

  useEffect(() => {
    setPage(1);
  }, [totalItems, sort]);

  return (
    <div className="bg-white">
      <div>
        <MobileFilter
          handleFilter={handleFilter}
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
        />

        <main className="mx-auto  px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b p-8 border-gray-200 pb-4">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Products
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <button
                              onClick={(e) => handleSort(e, option)}
                              className={`block px-4 py-2 text-sm ${
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500"
                              } ${active ? "bg-gray-100" : ""}`}
                            >
                              {option.name}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <div className="grid grid-cols-1 gap-x-5 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <DesktopFilter handleFilter={handleFilter} />

              {/* Product grid */}
              <div className="lg:col-span-3">
                <ProductGrid products={products} />
              </div>
            </div>
          </section>
          {/* pagination */}
          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <Pagination
              page={page}
              setPage={setPage}
              handlePage={handlePage}
              totalItems={totalItems}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

function MobileFilter({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  handleFilter,
}) {
  return (
    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 lg:hidden"
        onClose={setMobileFiltersOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-6">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  onChange={(e) =>
                                    handleFilter(e, section, option)
                                  }
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                  className="ml-3 min-w-0 flex-1 text-gray-500"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

function DesktopFilter({ handleFilter }) {
  return (
    <>
      <form className="hidden lg:block">
        <h3 className="text-xl font-semibold">Filter</h3>

        {filters.map((section) => (
          <Disclosure
            as="div"
            key={section.id}
            className="border-b border-gray-200 py-6"
          >
            {({ open }) => (
              <>
                <h3 className="-my-3 flow-root">
                  <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                    <span className="font-medium text-gray-900">
                      {section.name}
                    </span>
                    <span className="ml-6 flex items-center">
                      {open ? (
                        <MinusIcon className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <PlusIcon className="h-5 w-5" aria-hidden="true" />
                      )}
                    </span>
                  </Disclosure.Button>
                </h3>
                <Disclosure.Panel className="pt-6">
                  <div className="space-y-4">
                    {section.options.map((option, optionIdx) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          id={`filter-${section.id}-${optionIdx}`}
                          name={`${section.id}[]`}
                          defaultValue={option.value}
                          type="checkbox"
                          defaultChecked={option.checked}
                          onChange={(e) => handleFilter(e, section, option)}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label
                          htmlFor={`filter-${section.id}-${optionIdx}`}
                          className="ml-3 text-sm text-gray-600"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </form>
    </>
  );
}

function Pagination({ page, setPage, handlePage, totalItems = 55 }) {
  return (
    <>
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(page - 1) * ITEMS_PER_PAGE + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {page * ITEMS_PER_PAGE > totalItems
                ? totalItems
                : page * ITEMS_PER_PAGE}
            </span>{" "}
            of <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <a
              href="#"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {Array.from({ length: Math.ceil(totalItems / ITEMS_PER_PAGE) }).map(
              (el, index) => (
                <div
                  onClick={(e) => handlePage(index + 1)}
                  aria-current="page"
                  className={`relative cursor-pointer z-10 inline-flex items-center ${
                    index + 1 === page
                      ? "bg-indigo-600 text-white"
                      : "text-gray-400"
                  } px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                >
                  {index + 1}
                </div>
              )
            )}

            <a
              href="#"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </>
  );
}

function ProductGrid({ products }) {
  return (
    <div>
      <div className="bg-white ">
        <div className=" grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products &&
            products.map((product) => (
              <Link to="/productDetails">
                <div key={product.id} className="group relative">
                  <div className="w-full overflow-hidden rounded-md bg-gray-200 hover:shadow-xl">
                    <img
                      src={product.imgSrc}
                      alt={product.brand}
                      className="object-center object-cover w-full "
                    />

                    <div className="px-2">
                      <h3 className="text-lg font-bold text-gray-900">
                        {product.brand}
                      </h3>
                      <p className=" truncate text-sm text-gray-500">
                        {product.name}
                      </p>
                    </div>
                    <div className=" flex justify-between px-2">
                      <span className="block  font-semibold">
                        {product.discountedPrice}
                      </span>
                      <span className="line-through  opacity-50">
                        {product.price}
                      </span>
                      <span className="text-green-600 ">
                        {product.discountPercentage}
                      </span>

                      <div class="flex flex-col right-4 absolute top-3">
                        <div>
                          <button>
                            <FaRegHeart class="text-red-800" size={24} />
                          </button>
                        </div>
                        <div>
                          <button>
                            <FaCartPlus class="text-red-800" size={24} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
