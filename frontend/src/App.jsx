import {Navigate, createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import Houses from "./pages/Houses";
import HouseAdverts from "./pages/HouseAdverts";
import { loader as houses_loader} from "./pages/Houses";
import { loader as house_adverts_loader} from "./pages/HouseAdverts";
import { action as advert_action} from "./pages/HouseAdverts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        index: true,
        element: <Navigate to="/houses"/>
      },
      {
        path: "houses",
        element: <Houses/>,
        loader: houses_loader,
      },
      {
        path: "houses/:house_id/adverts",
        element: <HouseAdverts/>,
        loader: house_adverts_loader,
        action: advert_action
      },
      // {
      //   path: "houses/:house_id/adverts/:advert_id",
      //   action: advert_action
      // }
    ]
  }
])

export default function App(){
  return (
    <RouterProvider router={router}/>
  )
}

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Layout />} loader={house_ids_loader}>
//           <Route path="houses" element={<Houses />}/>
//             {/*<Route path=":houseId/adverts" element={<House />}>
//                 <Route path="adverts" element={<Adverts />}>
//                     <Route path=":q_advertId/compare/:k_advertId" element={<AdvertCompare />}>
//                     </Route>
//                 </Route>
//     </Route>*/}
//           <Route path="*" element={<NoPage />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }