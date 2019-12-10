#ifndef PCL_LOADER_H_
#define PCL_LOADER_H_

#include <boost/python.hpp>
#include <boost/python/suite/indexing/vector_indexing_suite.hpp>
#include <pcl/io/pcd_io.h>
namespace robosense
{
    namespace perception
    {
        typedef typename pcl::PointXYZI PointT;
        typedef typename pcl::PointCloud<PointT> PointCloud;
        typedef typename pcl::PointCloud<PointT>::Ptr PointCloudPtr;
        typedef typename pcl::PointCloud<PointT>::ConstPtr PointCloudConstPtr;

        //void pcl_loader(std::string pcd_path, std::vector<std::vector<float> > &pcd_data);
        boost::python::list pcl_loader(std::string pcd_path);
        void pcl_entrypt(std::string config_path, std::string pcd_path, std::string save_path);
    }
}

#endif //PCL_LOADER_H_