#include "pcl_process.h"
#include "crsencrypt.h"

namespace robosense
{
    namespace perception
    {        
        boost::python::list pcl_loader(std::string pcd_path)
        {
            PointCloudPtr pcd_cloud_ptr;
            pcd_cloud_ptr.reset(new PointCloud);

            if (pcl::io::loadPCDFile<PointT>(pcd_path, *pcd_cloud_ptr) == -1)
            {
                std::cerr << "Failed to load pcd data: " << pcd_path << std::endl;
                throw;
            }
            
            boost::python::list pcd_data;
            for (int i = 0; i < pcd_cloud_ptr->size(); ++i)
            {
                PointT &tmp_pt = pcd_cloud_ptr->points[i];
                if (std::isnan(tmp_pt.x) || std::isnan(tmp_pt.y) || std::isnan(tmp_pt.z) ||
                    std::isnan(tmp_pt.intensity))
                    continue;
                boost::python::list point_list;
                point_list.append(tmp_pt.x);
                point_list.append(tmp_pt.y);
                point_list.append(tmp_pt.z);
                point_list.append(tmp_pt.intensity);
                pcd_data.append(point_list);
            }
            return pcd_data;
        }

//        void pcl_loader(std::string pcd_path, std::vector<std::vector<float> > &pcd_data)
//        {
//            PointCloudPtr pcd_cloud_ptr;
//            pcd_cloud_ptr.reset(new PointCloud);
//
//            if (pcl::io::loadPCDFile<PointT>(pcd_path, *pcd_cloud_ptr) == -1)
//            {
//                std::cerr << "Failed to load pcd data: " << pcd_path << std::endl;
//                throw;
//            }
//            pcd_data.clear();
//            for (int i = 0; i < pcd_cloud_ptr->size(); ++i)
//            {
//                PointT &tmp_pt = pcd_cloud_ptr->points[i];
//                if (std::isnan(tmp_pt.x) || std::isnan(tmp_pt.y) || std::isnan(tmp_pt.z) ||
//                    std::isnan(tmp_pt.intensity))
//                    continue;
//                std::vector<float> point_vec;
//                point_vec.resize(4);
//                point_vec[0] = tmp_pt.x;
//                point_vec[1] = tmp_pt.y;
//                point_vec[2] = tmp_pt.z;
//                point_vec[3] = tmp_pt.intensity;
//                pcd_data.emplace_back(point_vec);
//            }
//        }

        void pcl_entrypt(std::string config_path, std::string pcd_path, std::string save_path)
        {
            PointCloudPtr pcd_cloud_ptr;
            pcd_cloud_ptr.reset(new PointCloud);

            if (pcl::io::loadPCDFile<PointT>(pcd_path, *pcd_cloud_ptr) == -1)
            {
                std::cerr << "Failed to load pcd data: " << pcd_path << std::endl;
                throw;
            }

            std::shared_ptr<RS_Encrypt::CRSEncrypt> encryptor;
            encryptor.reset(new RS_Encrypt::CRSEncrypt(config_path));
            encryptor->m_encryptPointCloudXYZI(pcd_cloud_ptr, save_path);

        }
    }
}