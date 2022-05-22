using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using WebApplication3.Models;


namespace WebApplication3.Controllers
{
    //Kjo bohet per me lidh applikacionin me databazen ne MSSQL
    public class PoliciaController : ApiController
    {
        public HttpResponseMessage Get()
        {
            string query = @"
                select PoliciaId, EmriDenuarit, llojiIgjobes,
                convert(varchar(10),Data,120) as Data, 
                FotoEteDenuarit from
               dbo.departamentiPolicia
            ";
            DataTable table = new DataTable();
            using (var con = new SqlConnection(ConfigurationManager.
                ConnectionStrings["PoliciaAppDB"].ConnectionString))
            using (var cmd = new SqlCommand(query, con)) 
                using(var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }
            return Request.CreateResponse(HttpStatusCode.OK, table);
           
        }






        //KJO OSHT ME TRY CATCH NESE NUK BON DUHET ME FSHI SE NUK PO E DIJME DEPARTAMENTI A OSHT I NJEJT

        [HttpPost]

        public string Post([FromBody]departamentiPolicise  dp )
        {
            try
            {
                string query = @"
                   insert into dbo.departamentiPolicia values 
                    (
                    '" + dp.EmriDenuarit + @"'
                    ,'" + dp.llojiIgjobes + @"'
                    ,'" + dp.Data + @"'
                    ,'" + dp.FotoEteDenuarit + @"'
                    )
                    ";



                DataTable table = new DataTable();
                using (var con = new SqlConnection(ConfigurationManager.
                    ConnectionStrings["PoliciaAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }

                return "Added Succesfully!";
            }
            catch (Exception)
            {
                return"Failed to Add!!";
            }
        }



        public string Put(departamentiPolicise dp)
        {
            try
            {
                string query = @"
                    update dbo.departamentiPolicia set 
                    EmriDenuarit='" + dp.EmriDenuarit + @"'
                    ,llojiIgjobes='" + dp.llojiIgjobes + @"'
                    ,Data='" + dp.Data + @"'
                    ,FotoEteDenuarit='" + dp.FotoEteDenuarit + @"'
                    where PoliciaId=" + dp.PoliciaId + @"
                    ";


                DataTable table = new DataTable();
                using (var con = new SqlConnection(ConfigurationManager.
                    ConnectionStrings["PoliciaAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }

                return "Added Succesfully!";
            }
            catch (Exception)
            {
                return "Failed to Add!!";
            }


        }






        //DELETE
        public string Delete(int id)
        {
            try
            {
                string query = @"
                    delete from dbo.departamentiPolicia 
                    where PoliciaId=" + id + @"
                    ";

                DataTable table = new DataTable();
                using (var con = new SqlConnection(ConfigurationManager.
                    ConnectionStrings["PoliciaAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }

                return "Deleted Successfully!!";
            }
            catch (Exception)
            {

                return "Failed to Delete!!";
            }
        }
        //FUNDI I DELETE



        //KJO PJESE OSHT QE DUHET ME FSHI SE PO NA DOKET QE NUK NA VYN SE OSHT VEQ PER DEPPARTAMENT
        [Route("api/departamentiPolicia/GetAllPoliciaNames")]
        [HttpGet]
        public HttpResponseMessage GetAllPoliciaNames()
        {
            string query = @"
                    select EmriDenuarit from dbo.departamentiPolicia";

            DataTable table = new DataTable();
            using (var con = new SqlConnection(ConfigurationManager.
                ConnectionStrings["PoliciaAppDB"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }

            return Request.CreateResponse(HttpStatusCode.OK, table);
        }




        //FUNDIIIIIIIII----  KJO PJESE OSHT QE DUHET ME FSHI SE PO NA DOKET QE NUK NA VYN SE OSHT VEQ PER DEPPARTAMENT

        //KY OSHT FUNDI I TRY CATCH



        [Route("api/departamentiPolicia/SaveFile")]

        //PPER PHOTOS
        public string SaveFile()
        {
            try
            {
                var httpRequest = HttpContext.Current.Request;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = HttpContext.Current.Server.MapPath("~/Photos/" + filename);

                postedFile.SaveAs(physicalPath);

                return filename;
            }
            catch (Exception)
            {

                return "anonymous.png";
            }
        }

        //FUNDI PER PHOTOS
    }
}
