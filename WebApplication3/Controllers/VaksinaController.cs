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
    public class VaksinaController : ApiController
    {
        public HttpResponseMessage Get()
        {
            string query = @"
                select Id, Emri, NumriIVaksinuarit,Vendlindja, LlojiVaksines, convert(varchar(10),DataVaksinimit) as DataVaksinimit,
               Mjeku,  NrIDozave
                 from
               dbo.Vaksina
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
            return Request.CreateResponse(HttpStatusCode.OK, table);

        }






        //KJO OSHT ME TRY CATCH NESE NUK BON DUHET ME FSHI SE NUK PO E DIJME DEPARTAMENTI A OSHT I NJEJT

        [HttpPost]

        public string Post([FromBody] Vaksinat va)
        {
            try
            {
                string query = @"
                   insert into dbo.Vaksina values 
                    (
                    '" + va.Emri + @"'
                   ,'" + va.NumriIVaksinuarit + @"' 
                    ,'" + va.Vendlindja + @"'
                    ,'" + va.LlojiVaksines + @"'
                    ,'" + va.DataVaksinimit + @"'
                    ,'" + va.Mjeku + @"'
                    ,'" + va.NrIDozave + @"'
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
                return "Failed to Add!!";
            }
        }



        public string Put(Vaksinat va)
        {
            try
            {
                string query = @"
                    update dbo.Vaksina set     
                    Emri='" + va.Emri + @"'
                    ,NumriIVaksinuarit='" + va.NumriIVaksinuarit + @"'
                    ,Vendlindja='" + va.Vendlindja + @"'
                    ,LlojiVaksines='" + va.LlojiVaksines + @"'
                    ,DataVaksinimit='" + va.DataVaksinimit + @"'
                    ,Mjeku='" + va.Mjeku + @"'
                    ,NrIDozave='" + va.NrIDozave + @"'
                    where Id=" + va.Id + @"
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
                    delete from dbo.Vaksina
                    where Id=" + id + @"
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
        [Route("api/Leja/GetAllLejaNames")]
        [HttpGet]
        public HttpResponseMessage GetAllLejaNames()
        {
            string query = @"
                    select EmriLejaMarresit from dbo.Leja";

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



        [Route("api/Leja/SaveFile")]

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
