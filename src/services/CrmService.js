import ApiService from "./ApiService";

export async function apiGetCrmDashboardData(data) {
  return ApiService.fetchData({
    url: "/crm/dashboard",
    method: "get",
    data,
  });
}

export async function apiGetCrmCalendar() {
  return ApiService.fetchData({
    url: "/crm/calendar",
    method: "get",
  });
}

export async function apiPutCrmCustomer(data) {
  return ApiService.fetchData({
    url: "/crm/customers",
    method: "put",
    data,
  });
}

export async function apiDeleteCrmCustomer(data) {
  return ApiService.fetchData({
    url: "/crm/customer/delete",
    method: "delete",
    data,
  });
}

export async function apiGetCrmMails(params) {
  return ApiService.fetchData({
    url: "/crm/mails",
    method: "get",
    params,
  });
}

export async function apiGetCrmMail(params) {
  return ApiService.fetchData({
    url: "/crm/mail",
    method: "get",
    params,
  });
}

//ARGUS ENP POINTS

export async function apiGetCrmCustomers(params) {
  //
  return ApiService.fetchData({
    url: "targets/",
    method: "get",
    params,
  });
}

export async function apiGetCrmCustomersStatistic(params) {
  return ApiService.fetchData({
    url: "targets_statistics/",
    method: "get",
    params,
  });
}

export async function apiPostCrmTarget(data) {
  return ApiService.fetchData({
    url: "targets/",
    method: "post",
    data,
  });
}

export async function apiGetCrmCustomerDetails(params) {
  return ApiService.fetchData({
    url: "/crm/customer-details",
    method: "get",
    params,
  });
}
