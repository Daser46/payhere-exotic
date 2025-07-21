import Hero from "@/components/Hero";
import Featured from "@/components/Feteaured";
import BannerHome1 from "@/components/Banners/Bannerhome1";
import BestSales from "@/components/Bestsales";
import Brands from "@/components/Brands";
import Categories from "@/components/Categories";
import Banner2 from "@/components/Banners/Banner2";
import { supabase } from "@/lib/supabase";
import Sales from "@/components/Sales";
import Mostdiscounted from "@/components/Mostdiscounted";


export default function Home() {
  // const setNewView = async () => {
  //   const { data, error } = await supabase
  //   .from("views")
  //   .insert({
  //     name :'exotic mobile'
  //   })
  //   if (data ) console.log(data);
  //   if (error) {
  //     console.error(error);
  //   }
  // };

  // setNewView();
  return (
    <div className="min-h-screen sm:py-8 overflow-hidden">
    <div className="area">
          <ul className="circles">
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
          </ul>
          <Hero />
    </div>      
      <BannerHome1 />
      <Featured />
      <div className="container mx-auto px-4 py-8">
        {/* <h1 className="text-3xl font-bold mb-8">Today's Deals</h1> */}
        {/* <FlashDealCarousel /> */}
      </div>
      
      {/* <Categories /> */}
      <Sales/>
      <BestSales />
      {/* <Mostdiscounted/> */}

      {/* <Banner2/> */}
      <Brands />
      {/* <Loading/> */}



    </div>
  );
}
