using System;
using System.Collections.Generic;
using System.Web.Http;
using NumberToWordAPI.Models;
using NumberToWordAPI.BusinessLayer;
using System.Net.Http;
using System.Net;
using System.Web.Http.Cors;

namespace NumberToWordAPI.Controllers
{
    [EnableCors("*", "*", "*")]
    public class NumberToWordController : ApiController
    {
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };

        }
        [HttpGet]
        public string GetConvertedValue(decimal number)
        {

            string decimals = "";
            string input = Math.Round(number, 2).ToString();

            if (input.Contains("."))
            {
                decimals = input.Substring(input.IndexOf(".") + 1);
                // remove decimal part from input
                input = input.Remove(input.IndexOf("."));

            }


            //Convert input into words. save it into strWords
            string strWords = NumberToWordAPI.BusinessLayer.NumberToWordUtility.GetWords(input) + " DOLLARS";


            if (decimals.Length > 0)
            {
                // if there is any decimal part convert it to words and add it to strWords.
                strWords += " AND " + NumberToWordAPI.BusinessLayer.NumberToWordUtility.GetWords(decimals) + " CENTS";
            }

            return strWords;


        }



    }
}
