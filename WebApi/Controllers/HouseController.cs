using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using HouseViewer.Models;
using HouseViewer.ViewModels;
using Omu.ValueInjecter;
using WebApi.ViewModels;
using Microsoft.AspNetCore.JsonPatch;

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
                            .OrderBy(h => h.FavoriteRanking)
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

        [HttpPatch("{id}")]
        public IActionResult PatchHouse(string id, [FromBody] JsonPatchDocument<House> patchDoc)
        {
            var house = searchHouseAppContext.Houses
                    .Where(h => h.Id == id)
                    .FirstOrDefault();

            if (house == null || patchDoc == null)
            {
                return NoContent();
            }

            patchDoc.ApplyTo(house, ModelState);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            searchHouseAppContext.SaveChanges();
            return Ok();
        }

        [HttpPatch("ranking/{id}/{isUp}")]
        public IActionResult IncreaseRanking(string id, bool isUp)
        {
            var house = searchHouseAppContext.Houses
                            .Where(h => h.Id == id)
                            .FirstOrDefault();

            if (house == null)
            {
                NoContent();
            }

            var modified = house.FavoriteRanking + 1 * (isUp ? -1 : 1);
            var otherHouse = searchHouseAppContext.Houses
                                .Where(h => h.FavoriteRanking == modified)
                                .FirstOrDefault();
            if (otherHouse == null)
            {
                BadRequest("Other House is not found");
            }

            otherHouse.FavoriteRanking = house.FavoriteRanking;
            house.FavoriteRanking = modified;
            searchHouseAppContext.SaveChanges();
            return Ok();
        }

        [HttpPatch("discard/{id}")]
        public IActionResult Discard(string id)
        {
            var house = searchHouseAppContext.Houses
                            .Where(h => h.Id == id)
                            .FirstOrDefault();
            if (house == null)
            {
                return NoContent();
            }

            house.FavoriteRanking = -2;
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