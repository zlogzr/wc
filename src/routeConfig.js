import React, { Suspense, lazy } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import AuthRoute from "./components/authRouter";

import CommonPage from "./commonPages";
// import Home from "./pages/home/loadable";
// import Login from "./pages/login/loadable";
import Super from "./pages/super";
// import NoAuthority from "./commonPages/noAuthority/loadable";
// import NoMatch from "./commonPages/noMatch/loadable";
//填單
// import FillFormCommon from "./pages/purchaseTicket/fillFormCommon/loadable";
// import FillFormAssistant from "./pages/purchaseTicket/fillFormAssistant/loadable";
// import SpecialApply from "./pages/fillForm/specialApply/loadable";
// import SpringFestivalApply from "./pages/fillForm/springFestivalApply/loadable";
import FillForm from "./pages/fillForm";
//我的訂單
import Orders from "./pages/orders";
// import AllTheApplyForm from "./pages/orders/allTheApplyForm/loadable";
// import Details from "./pages/orders/details/loadable";
// import WaitAffirmForm from "./pages/orders/waitAffirmForm/loadable";
// import ChangeWaitAffirmForm from "./pages/orders/changeWaitAffirmForm/loadable";
// import TickestOut from "./pages/orders/tickestOut/loadable";
// import BackChangeTicket from "./pages/orders/backChangeTicket/loadable";
// import DocumentRequoted from "./pages/travelAgencyPlatform/DocumentRequoted/loadable";
// import Deitaelse from "./pages/travelAgencyPlatform/DocumentRequoted/deitaelse/loadable";

//  第二版测试
// import  DocumentRequoted from './pages/orders/waitQuoteAgain/loadable'

//簽核
// import ApplyTicketSign from "./pages/sign/applyTicketSign/loadable";
// import Detail from "./pages/sign/detail/loadable";
import Sign from "./pages/sign";
//個人信息維護
import PersonInfo from "./pages/personInfo";
// import PersonInfoMaintain from "./pages/personInfo/personInfoMaintain/loadable";
// import FamilyInfoMaintain from "./pages/personInfo/familyInfoMaintain/loadable";
// import CommonPersonMaintain from "./pages/personInfo/commonPersonMaintain/loadable";
// 测试
// import ceshi from "./pages/personInfo/ceshi/loadable";
//管理員維護
import Admin from "./pages/adminMaintain";
// import AuthorityMaintain from "./pages/adminMaintain/authorityMaintain/loadable";
// import TravelMaintain from "./pages/adminMaintain/travelMaintain/loadable";
// import QuoteTimeMaintain from "./pages/adminMaintain/quoteTimeMaintain/loadable";
// import OrderSearch from "./pages/adminMaintain/ordersSearch/loadable";
// import KilometreMaintain from "./pages/adminMaintain/kilometreMaintain/loadable";
// import CompanyMaintain from "./pages/adminMaintain/companyMaintain/loadable";
// import FlightTimeMaintain from "./pages/adminMaintain/flightTimeMaintain/loadable";
// import Systemparametermaintenance from "./pages/adminMaintain/systemparametermaintenance/loadable";
// import ReportDownloadMaintain from "./pages/adminMaintain/reportDownloadMaintain/loadable";
// import monthlyStatementMaintain from "./pages/adminMaintain/monthlyStatementMaintain/loadable";
// 新聞維護
// import HomepageNewsManagement from "./pages/adminMaintain/HomepageNewsManagement/loadable";
// import Homenewsupdate from "./pages/adminMaintain/homenewsupdate/loadable";
// import HolidayMaintain from "./pages/adminMaintain/holidayMaintain/loadable";
// import RpaParamsMaintain from "./pages/adminMaintain/rpaParamsMaintain/loadable";

// 機場維護
// import AirportMaintenance from "./pages/adminMaintain/airportmaintenance/loadable";

// import Houtai from "./pages/adminMaintain/houtai";
// 报表页面
// import Reportfrom from "./pages/reportform";
// //  月结
// import Airticketmonthlystatement from "./pages/reportform/Airticketmonthlystatement/loadable";
// // 机票扣工薪报表
// import AirticketpayrolldeductionReport from "./pages/reportform/AirticketpayrolldeductionReport/loadable";
// //  成本分析
// import Airticketcostanalysisreport from "./pages/reportform/Airticketcostanalysisreport/loadable";
// // 機票報價記錄報表
// import Ticketquotationrecordreport from "./pages/reportform/Ticketquotationrecordreport/loadable";
// // 财务入账报表
// import Financialentrystatement from "./pages/reportform/Financialentrystatement/loadable";
// //旅行社平臺
// // import TravelAgencyPlatform from "./pages/travelAgencyPlatform";
// import QuotePrice from "./pages/travelAgencyPlatform/quotePrice/loadable";
// import QuotingPrice from "./pages/travelAgencyPlatform/quotingPrice/loadable";
// import QuotingPriceComplete from "./pages/travelAgencyPlatform/quotedPrice/loadable";
// import QuotingPriceCompleteDetail from "./pages/travelAgencyPlatform/quoteCompleteDetail/loadable";
// import WaitTicketOut from "./pages/travelAgencyPlatform/waitTicketOut/loadable";
// import WaitForTicketDetail from "./pages/travelAgencyPlatform/waitForTicketDetail/loadable";
// import TicketOut from "./pages/travelAgencyPlatform/ticketOut/loadable";
// import TicketOutDetail from "./pages/travelAgencyPlatform/ticketOutDetail/loadable";
// import BackAndChangeTicket from "./pages/travelAgencyPlatform/backAndChangeTicket/loadable";
// import BackAndChangeTicketDetail from "./pages/travelAgencyPlatform/backAndChangeTicketDetail/loadable";
// import WaitBackTicket from "./pages/travelAgencyPlatform/waitBackTicket/loadable";
// import WaitBackTicketDetail from "./pages/travelAgencyPlatform/waitBackTicketDetail/loadable";
// import WitChangeTicket from "./pages/travelAgencyPlatform/waitChangeTicket/loadable";
import TravelAgencyInfo from "./pages/travelAgencyPlatform/travelAgencyInfo/info";
import TravelAgencyEdit from "./pages/travelAgencyPlatform/travelAgencyInfo/edit";
import TravelAgency from "./pages/travelAgencyPlatform/travelAgencyInfo";

// import Tuigaiqian from "./pages/travelAgencyPlatform/tuigaiqian/loadable";
import Homenews from "../src/pages/home/homenews.js";

import { Spin } from "antd";
// 使用React.lazy懒加载改造
const Home = lazy(() => import("./pages/home"))
const Login = lazy(() => import("./pages/login"))
const NoAuthority = lazy(() => import("./commonPages/noAuthority"))
const NoMatch = lazy(() => import("./commonPages/noMatch"))
// 填單
const FillFormCommon = lazy(() => import("./pages/purchaseTicket/fillFormCommon"))
const FillFormAssistant = lazy(() => import("./pages/purchaseTicket/fillFormAssistant"))
//我的訂單
const AllTheApplyForm = lazy(() => import("./pages/orders/allTheApplyForm"))
const Details = lazy(() => import("./pages/orders/details"))
const WaitAffirmForm = lazy(() => import("./pages/orders/waitAffirmForm"))
const ChangeWaitAffirmForm = lazy(() => import("./pages/orders/changeWaitAffirmForm"))
const TickestOut = lazy(() => import("./pages/orders/tickestOut"))
const BackChangeTicket = lazy(() => import("./pages/orders/backChangeTicket"))
const DocumentRequoted = lazy(() => import("./pages/travelAgencyPlatform/DocumentRequoted"))
const Deitaelse = lazy(() => import("./pages/travelAgencyPlatform/DocumentRequoted/deitaelse"))
// 簽核
const ApplyTicketSign = lazy(() => import("./pages/sign/applyTicketSign"))
const Detail = lazy(() => import("./pages/sign/detail"))
const PersonInfoMaintain = lazy(() => import("./pages/personInfo/personInfoMaintain"))
const FamilyInfoMaintain = lazy(() => import("./pages/personInfo/familyInfoMaintain"))
const CommonPersonMaintain = lazy(() => import("./pages/personInfo/commonPersonMaintain"))
//管理員維護
const AuthorityMaintain = lazy(() => import("./pages/adminMaintain/authorityMaintain"))
const TravelMaintain = lazy(() => import("./pages/adminMaintain/travelMaintain"))
const QuoteTimeMaintain = lazy(() => import("./pages/adminMaintain/quoteTimeMaintain"))
const OrderSearch = lazy(() => import("./pages/adminMaintain/ordersSearch"))
const KilometreMaintain = lazy(() => import("./pages/adminMaintain/kilometreMaintain"))
const CompanyMaintain = lazy(() => import("./pages/adminMaintain/companyMaintain"))
const FlightTimeMaintain = lazy(() => import("./pages/adminMaintain/flightTimeMaintain"))
const Systemparametermaintenance = lazy(() => import("./pages/adminMaintain/systemparametermaintenance"))
const ReportDownloadMaintain = lazy(() => import("./pages/adminMaintain/reportDownloadMaintain"))
const monthlyStatementMaintain = lazy(() => import("./pages/adminMaintain/monthlyStatementMaintain"))
// 新聞維護
const Homenewsupdate = lazy(() => import("./pages/adminMaintain/homenewsupdate"))
const HolidayMaintain = lazy(() => import("./pages/adminMaintain/holidayMaintain"))
const RpaParamsMaintain = lazy(() => import("./pages/adminMaintain/rpaParamsMaintain"))
// 機場維護
const AirportMaintenance = lazy(() => import("./pages/adminMaintain/airportmaintenance"))
//  机票月结报表
const Airticketmonthlystatement = lazy(() => import("./pages/reportform/Airticketmonthlystatement"))
// 机票扣工薪报表
const AirticketpayrolldeductionReport = lazy(() => import("./pages/reportform/AirticketpayrolldeductionReport"))
// 機票成本分析報表
const Airticketcostanalysisreport = lazy(() => import("./pages/reportform/Airticketcostanalysisreport"))
// 機票報價記錄報表
const Ticketquotationrecordreport = lazy(() => import("./pages/reportform/Ticketquotationrecordreport"))
// 财务入账报表
const Financialentrystatement = lazy(() => import("./pages/reportform/Financialentrystatement"))
//旅行社平臺
const QuotePrice = lazy(() => import("./pages/travelAgencyPlatform/quotePrice"))
const QuotingPrice = lazy(() => import("./pages/travelAgencyPlatform/quotingPrice"))
const QuotingPriceComplete = lazy(() => import("./pages/travelAgencyPlatform/quotedPrice"))
const QuotingPriceCompleteDetail = lazy(() => import("./pages/travelAgencyPlatform/quoteCompleteDetail"))
const WaitTicketOut = lazy(() => import("./pages/travelAgencyPlatform/waitTicketOut"))
const WaitForTicketDetail = lazy(() => import("./pages/travelAgencyPlatform/waitForTicketDetail"))
const TicketOut = lazy(() => import("./pages/travelAgencyPlatform/ticketOut"))
const TicketOutDetail = lazy(() => import("./pages/travelAgencyPlatform/ticketOutDetail"))
const BackAndChangeTicket = lazy(() => import("./pages/travelAgencyPlatform/backAndChangeTicket"))
const BackAndChangeTicketDetail = lazy(() => import("./pages/travelAgencyPlatform/backAndChangeTicketDetail"))
const WaitBackTicket = lazy(() => import("./pages/travelAgencyPlatform/waitBackTicket"))
const WaitBackTicketDetail = lazy(() => import("./pages/travelAgencyPlatform/waitBackTicketDetail"))
const WitChangeTicket = lazy(() => import("./pages/travelAgencyPlatform/waitChangeTicket"))

const Loading = (
  <div style={{ width: '1200px', margin: '0 auto' }}>
    <Spin style={{ marginLeft: '120px' }} />
  </div>
)

const RouteConfig = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/homenews" component={Homenews} />
        <Route exact path="/members_of_Mel100" component={Super} />
        <Redirect exact from="/" to="/home" />
        <Route
          path="/"
          render={() => (
            <CommonPage>
              <Suspense fallback={Loading}>
                <Switch>
                  {/* 首頁 */}
                  <Route exact path="/home" component={Home} />
                  {/* 機票購買 */}
                  <Redirect
                    exact
                    from="/ticket-buy"
                    to="/ticket-buy/common-apply"
                  />
                  <AuthRoute
                    path="/ticket-buy"
                    render={() => (
                      <FillForm>
                        <AuthRoute
                          path="/ticket-buy/common-apply"
                          component={FillFormCommon}
                        />
                        <AuthRoute
                          path="/ticket-buy/assistant-apply"
                          component={FillFormAssistant}
                        />
                        <AuthRoute
                          path="/ticket-buy/no-authority"
                          component={NoAuthority}
                        />
                        {/* <AuthRoute path='/ticket-buy/special-apply' component={SpecialApply}/>
                        <AuthRoute path='/ticket-buy/springFestival-apply' component={SpringFestivalApply}/> */}
                      </FillForm>
                    )}
                  />

                  {/* 我的訂單 */}
                  <Redirect exact from="/orders" to="/orders/list/1" />
                  <AuthRoute
                    path="/orders"
                    render={() => (
                      <Orders>
                        <AuthRoute
                          exact
                          path="/orders/list/:id"
                          component={AllTheApplyForm}
                        />
                        <AuthRoute
                          exact
                          path="/orders/details"
                          component={Details}
                        />
                        <AuthRoute
                          exact
                          path="/orders/3"
                          component={WaitAffirmForm}
                        />
                        <AuthRoute
                          exact
                          path="/orders/4"
                          component={ChangeWaitAffirmForm}
                        />
                        <AuthRoute
                          exact
                          path="/orders/5"
                          component={TickestOut}
                        />
                        <AuthRoute
                          exact
                          path="/orders/5/backChangeTicket"
                          component={BackChangeTicket}
                        />
                        <AuthRoute
                          exact
                          path="/orders/6"
                          component={DocumentRequoted}
                        />

                        <AuthRoute
                          exact
                          path="/orders/detail"
                          component={Deitaelse}
                        />
                      </Orders>
                    )}
                  />

                  {/* 簽核 */}
                  <Redirect exact from="/sign" to="/sign/list/1" />
                  <AuthRoute
                    path="/sign"
                    render={() => (
                      <Sign>
                        <AuthRoute
                          exact
                          path="/sign/list/:id"
                          component={ApplyTicketSign}
                        />
                        <AuthRoute exact path="/sign/detail" component={Detail} />
                      </Sign>
                    )}
                  />
                  {/* 個人中心 */}
                  <Redirect exact from="/person" to="/person/1" />
                  <AuthRoute
                    path="/person"
                    render={() => (
                      <PersonInfo>
                        <AuthRoute
                          path="/person/1"
                          component={PersonInfoMaintain}
                        />
                        <AuthRoute
                          path="/person/2"
                          component={FamilyInfoMaintain}
                        />
                        <AuthRoute
                          path="/person/3"
                          component={CommonPersonMaintain}
                        />
                        {/* <AuthRoute path='/person/4' component={ceshi} /> */}
                      </PersonInfo>
                    )}
                  />
                  {/* 报表 */}
                  <Redirect
                    exact
                    from="/reportform"
                    to="/reportform/Airticketmonthlystatement"
                  />

                  <AuthRoute
                    exact
                    path="/reportform/Airticketmonthlystatement"
                    component={Airticketmonthlystatement}
                  />
                  <AuthRoute
                    exact
                    path="/reportform/AirticketpayrolldeductionReport"
                    component={AirticketpayrolldeductionReport}
                  />
                  <AuthRoute
                    exact
                    path="/reportform/Airticketcostanalysisreport"
                    component={Airticketcostanalysisreport}
                  />
                  <AuthRoute
                    exact
                    path="/reportform/Ticketquotationrecordreport"
                    component={Ticketquotationrecordreport}
                  />
                  <AuthRoute
                    exact
                    path="/reportform/Financialentrystatement"
                    component={Financialentrystatement}
                  />

                  {/*  */}
                  {/* 旅行社平臺 */}
                  {/* <Redirect exact from='/travel-agency' to='/travel-agency/quote-price' />
                    <AuthRoute path='/travel-agency' render={() => (
                      <TravelAgencyPlatform> */}
                  <AuthRoute
                    exact
                    path="/travel-agency/quote-price"
                    component={QuotePrice}
                  />
                  <AuthRoute
                    exact
                    path="/travel-agency/quote-price/detail"
                    component={QuotingPrice}
                  />
                  <AuthRoute
                    exact
                    path="/travel-agency/quote-price-complete"
                    component={QuotingPriceComplete}
                  />
                  <AuthRoute
                    exact
                    path="/travel-agency/quote-price-complete/detail"
                    component={QuotingPriceCompleteDetail}
                  />
                  <AuthRoute
                    exact
                    path="/travel-agency/wait-ticket-out"
                    component={WaitTicketOut}
                  />
                  <AuthRoute
                    exact
                    path="/travel-agency/wait-ticket-out/detail"
                    component={WaitForTicketDetail}
                  />
                  <AuthRoute
                    exact
                    path="/travel-agency/ticket-out"
                    component={TicketOut}
                  />
                  <AuthRoute
                    exact
                    path="/travel-agency/ticket-out/detail"
                    component={TicketOutDetail}
                  />
                  <AuthRoute
                    exact
                    path="/travel-agency/back-change-ticket"
                    component={BackAndChangeTicket}
                  />
                  <AuthRoute
                    exact
                    path="/travel-agency/back-change-ticket/detail"
                    component={BackAndChangeTicketDetail}
                  />
                  <AuthRoute
                    exact
                    path="/travel-agency/wait-back-ticket"
                    component={WaitBackTicket}
                  />
                  <AuthRoute
                    exact
                    path="/travel-agency/wait-back-ticket-detail"
                    component={WaitBackTicketDetail}
                  />

                  <AuthRoute
                    exact
                    path="/travel-agency/wait-change-ticket"
                    component={WitChangeTicket}
                  />
                  {/* 旅行社的個人中心 */}
                  <Redirect
                    exact
                    from="/travel-agency/center"
                    to="/travel-agency/center/info"
                  />
                  <AuthRoute
                    path="/travel-agency/center"
                    render={() => (
                      <TravelAgency>
                        <AuthRoute
                          path="/travel-agency/center/info"
                          component={TravelAgencyInfo}
                        />
                        <AuthRoute
                          path="/travel-agency/center/edit"
                          component={TravelAgencyEdit}
                        />
                      </TravelAgency>
                    )}
                  />
                  {/* </TravelAgencyPlatform>
                    )} /> */}

                  {/* 後臺維護 */}
                  <Redirect exact from="/admin" to="/admin/order-search" />
                  <AuthRoute
                    path="/admin"
                    render={() => (
                      <Admin>
                        {/* 所有訂單查詢 */}
                        <AuthRoute
                          path="/admin/order-search"
                          component={OrderSearch}
                        />
                        {/* 權限 */}
                        <AuthRoute
                          path="/admin/authority-maintain"
                          component={AuthorityMaintain}
                        />
                        {/* 旅行社 */}
                        <AuthRoute
                          path="/admin/travel-agency-maintain"
                          component={TravelMaintain}
                        />
                        {/* 公里數維護 */}
                        <AuthRoute
                          path="/admin/kilometre-maintain"
                          component={KilometreMaintain}
                        />
                        {/* 航空公司 */}
                        <AuthRoute
                          path="/admin/company-maintain"
                          component={CompanyMaintain}
                        />
                        {/* 航班時刻 */}
                        <AuthRoute
                          path="/admin/flight-maintain"
                          component={FlightTimeMaintain}
                        />
                        {/* 假期維護 */}
                        <AuthRoute
                          path="/admin/holiday-maintain"
                          component={HolidayMaintain}
                        />
                        {/* 系統參數維護 */}
                        <AuthRoute
                          path="/admin/system-maintain"
                          component={Systemparametermaintenance}
                        />

                        <AuthRoute
                          path="/admin/reportdownload-maintain"
                          component={ReportDownloadMaintain}
                        />
                        <AuthRoute
                          path="/admin/monthlyStatement-maintain"
                          component={monthlyStatementMaintain}
                        />
                        {/* 爬剛維護 */}
                        <AuthRoute
                          path="/admin/get-net-maintain"
                          component={RpaParamsMaintain}
                        />
                        {/* 報價時效 */}
                        <AuthRoute
                          path="/admin/quote-time-hour-maintain"
                          component={QuoteTimeMaintain}
                        />
                        {/* <AuthRoute path='/admin/home-page-news-management' component={HomepageNewsManagement}/> */}
                        {/* 首頁資訊 */}
                        <AuthRoute
                          path="/admin/home-page-news-update"
                          component={Homenewsupdate}
                        />
                        {/* 機場維護 */}
                        <AuthRoute
                          path="/admin/home-page-airport-maintenance"
                          component={AirportMaintenance}
                        />
                      </Admin>
                    )}
                  />
                  {/* 無權限 */}
                  <Route exact path="/no-authority" component={NoAuthority} />
                  {/* 無頁面 */}
                  <Route component={NoMatch} />
                </Switch>
              </Suspense>
            </CommonPage>
          )}
        />
      </Switch>
    </HashRouter>
  );
};

export default RouteConfig;
