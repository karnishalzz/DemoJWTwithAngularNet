using DemoApplicationNet5Angular.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DemoApplicationNet5Angular.Models
{
    public class ResponseModel
    {
        public ResponseModel(ResponseCode code, string message, object dataset)
        {
            Code = code;
            Message = message;
            Dataset = dataset;
        }
        public ResponseCode Code { get; set; }
        public string Message { get; set; }
        public object Dataset { get; set; }
    }
}
