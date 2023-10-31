using Backend.DTOs;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [Route("api")]
    [ApiController]
    public class AdminRequestController : ControllerBase
    {
        private readonly TDSKardexRequest.TDSKardexRequestContext _dbKardexRequest = new TDSKardexRequest.TDSKardexRequestContext();
        
  

        [HttpPut("admin/{requestId:int}/{deliverDate:datetime}/accept")]
        public async Task<ActionResult<ResponseDTO<TDSKardexRequest>>> UpdateKardexRequest(int requestId, [FromRoute] DateTime deliverDate)
        {
            try
            {
                Console.WriteLine("Entering the method");

                var kardexRequest = await _dbKardexRequest.TDS_kardex_request.FindAsync(requestId);
                Console.WriteLine("Kardex request found");


                if (kardexRequest == null)
                {
                    return NotFound("Kardex request not found");
                }

                kardexRequest.request_state = "Aceptado";
                kardexRequest.deliver_date = deliverDate;
                kardexRequest.date = DateTime.Now;

                _dbKardexRequest.Entry(kardexRequest).State = EntityState.Modified;
                await _dbKardexRequest.SaveChangesAsync();

                var kardexRequestUpdated = await _dbKardexRequest.TDS_kardex_request.FindAsync(requestId);

                return Ok(new ResponseDTO<TDSKardexRequest>(kardexRequestUpdated, null, true));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        
        //Make the same function, but for reject
        [HttpPut("admin/{requestId:int}/reject")]
        public async Task<ActionResult<ResponseDTO<TDSKardexRequest>>> RejectRquest(int requestId)
        {
            try
            {
                Console.WriteLine("Entering the method");

                var kardexRequest = await _dbKardexRequest.TDS_kardex_request.FindAsync(requestId);
                Console.WriteLine("Kardex request found");


                if (kardexRequest == null)
                {
                    return NotFound("Kardex request not found");
                }

                kardexRequest.request_state = "Rechazado";
                kardexRequest.deliver_date = DateTime.Now;
                kardexRequest.date = DateTime.Now;

                _dbKardexRequest.Entry(kardexRequest).State = EntityState.Modified;
                await _dbKardexRequest.SaveChangesAsync();

                var kardexRequestUpdated = await _dbKardexRequest.TDS_kardex_request.FindAsync(requestId);

                return Ok(new ResponseDTO<TDSKardexRequest>(kardexRequestUpdated, null, true));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
    
    
    
}