using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.UI.WebControls;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class DepartmentController : ApiController
    {
        public HttpResponseMessage Get()
        {
            string query = @"
select DepartmentId,DepartmentName from dbo.Department";
            DataTable table= new DataTable();
            using(var con=new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
                using(var cmd=new SqlCommand(query,con))
                using(var da=new SqlDataAdapter(cmd))
            {
                cmd.CommandType=CommandType.Text;
                da.Fill(table);
            }
            return Request.CreateResponse(HttpStatusCode.OK,table);
        }
        /*  public string Post(DepartmentController department)
          {
              try
              {
                  string query = @"
              INSERT INTO dbo.Department (DepartmentName) VALUES (@DepartmentName)
          ";

                  DataTable table = new DataTable();
                  using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
                  using (var cmd = new SqlCommand(query, con))
                  using (var da = new SqlDataAdapter(cmd))
                  {
                      cmd.CommandType = CommandType.Text;
                      cmd.Parameters.AddWithValue("@DepartmentName", department.DepartmentName);
                      con.Open();
                      cmd.ExecuteNonQuery();
                      //da.Fill(table);
                  }
                  return "Added Successfully!";
              }
              catch (Exception)
              {

                  return "Failed to Add";
              }
          }*/
        public string Post(Department department)
        {
            try
            {
                string query = @"
            INSERT INTO dbo.Department (DepartmentName) VALUES (@DepartmentName)
        ";

                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                {
                    cmd.CommandType = CommandType.Text;
                    cmd.Parameters.AddWithValue("@DepartmentName", department.DepartmentName);
                    con.Open();
                    cmd.ExecuteNonQuery();
                }

                return "Added Successfully!";
            }
            catch (Exception)
            {
                return "Failed to Add";
            }
        }
        public string Put(Department department)
        {
            try
            {
                string query = @"
            UPDATE dbo.Department set DepartmentName= '" + department.DepartmentName + @"'
where DepartmentId="+department.DepartmentId + @";
            
        ";
                DataTable table = new DataTable();
                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                 
                }
                       return "Updated Successfully!";
                    
                
            }
            catch (Exception)
            {
                return "Failed to Update";
            }
        }
        public string Delete(int id)
        {
            try
            {
                string query = @"
            DELETE FROM dbo.Department
            WHERE DepartmentId = " + id + @"
        ";
                DataTable table = new DataTable();
                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }
                        return "Deleted Successfully!";
                    
                   
                
            }
            catch (Exception)
            {
                return "Failed to Delete";
            }
        }


    }
}
