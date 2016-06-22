using Microsoft.AspNet.Mvc;

namespace Meh.Controllers
{
    [Route("api/[controller]")]
    public class CalculatorController : Controller
    {
        [Route("[action]/{left}/{right}")]
        public string Add(double left, double right)
        {
            return (left + right).ToString();
        }

        [Route("[action]/{left}/{right}")]
        public double Substract(double left, double right)
        {
            return left - right;
        }

        [Route("[action]/{left}/{right}")]
        public double Multiply(double left, double right)
        {
            return left * right;
        }

        [Route("[action]/{left}/{right}")]
        public string Devide(double left, double right)
        {
            if (right == 0)
            {
                return "Infinity";
            }
            return (left / right).ToString();
        }
    }
}
