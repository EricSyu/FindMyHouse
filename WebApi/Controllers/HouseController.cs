using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using HouseViewer.Models;
using HouseViewer.ViewModels;
using Omu.ValueInjecter;
using WebApi.ViewModels;

namespace HouseViewer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HouseController : ControllerBase
    {
        private readonly SearchHouseAppContext searchHouseAppContext;

        public HouseController(SearchHouseAppContext searchHouseAppContext)
        {
            this.searchHouseAppContext = searchHouseAppContext;
        }

        [HttpGet("")]
        public ActionResult<IEnumerable<HouseRead>> GetHouses()
        {
            var houses = searchHouseAppContext.Houses
                            .Select(h => new HouseRead().InjectFrom(h) as HouseRead)
                            .ToList();

            return houses;
        }

        [HttpGet("{id}")]
        public ActionResult<House> GetHouseById(int id)
        {
            return null;
        }

        [HttpPost("")]
        public ActionResult<House> PostHouse(House model)
        {
            return null;
        }

        [HttpPut("{id}")]
        public IActionResult PutHouse(string id, HouseWrite model)
        {
            var house = searchHouseAppContext.Houses
                            .Where(h => h.Id == id)
                            .FirstOrDefault();
            if (house == null)
            {
                return NoContent();
            }

            house.InjectFrom(model);
            searchHouseAppContext.SaveChanges();
            return Ok();
        }

        [HttpDelete("{id}")]
        public ActionResult<House> DeleteHouseById(int id)
        {
            return null;
        }
    }
}