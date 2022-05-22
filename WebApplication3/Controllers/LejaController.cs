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
    public class LejaController : ApiController
    {
        public HttpResponseMessage Get()
        {
            string query = @"
                select IdentitetiId, EmriLejaMarresit, NumriIdentifikues,Vendlindja,Kategoria,
                convert(varchar(10),DataPranimit,120) as DataPranimit,  convert(varchar(10),DataSkadences,120) as DataSkadences
                 from
               dbo.Leja
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

        public string Post([FromBody]Leje le)
        {
            try
            {
                string query = @"
                   insert into dbo.Leje values 
                    (
                    '" + le.EmriLejaMarresit + @"'
                   ,'" + le.NumriIdentifikues + @"' 
                    ,'" + le.Vendlindja + @"'
                    ,'" + le.Kategoria + @"'
                    ,'" + le.DataPranimit + @"'
                    ,'" + le.DataSkadences + @"'
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

 

public string Put(Leje le)
        {
            try
            {
                string query = @"
                    update dbo.Leja set     
                    EmriLejaMarresit='" + le.EmriLejaMarresit + @"'
                    ,NumriIdentifikues='" + le.NumriIdentifikues + @"'
                    ,Vendlindja='" + le.Vendlindja + @"'
                    ,Kategoria='" + le.Kategoria + @"'
                    ,DataPranimit='" + le.DataPranimit + @"'
                    ,DataSkadences='" + le.DataSkadences + @"'
                    where IdentitetiId=" + le.IdentitetiId + @"
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
                    delete from dbo.Leja
                    where IdentitetiId=" + id + @"
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
