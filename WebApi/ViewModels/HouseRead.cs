using System;

namespace HouseViewer.ViewModels
{
    public class HouseRead
    {
        public string Id { get; set; }
        public string Type { get; set; }
        public string Kind { get; set; }
        public string Shape { get; set; }
        public string Region { get; set; }
        public string Section { get; set; }
        public string Title { get; set; }
        public string Status { get; set; }
        public string Carport { get; set; }
        public string Room { get; set; }
        public string Floor { get; set; }
        public float Area { get; set; }
        public int HouseAge { get; set; }
        public float UnitPrice { get; set; }
        public int Price { get; set; }
        public string Link { get; set; }
        public string DataFrom { get; set; }
        public DateTime RecordTime { get; set; }
        public int FavoriteRanking { get; set; }
        public string Comment { get; set; }
    }
}