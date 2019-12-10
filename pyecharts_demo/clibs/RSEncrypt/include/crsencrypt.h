#ifndef CRSEncrypt_H
#define CRSEncrypt_H

/* ModuleName: CRSEncrypt
 * Discription: 数据加密
 * Author: heshiwen
 * Date: 2019-02-20
 *
*/

#include "crsencryptcommon.h"

namespace RS_Encrypt
{

class CRSEncrypt
{
public:
    CRSEncrypt();
    CRSEncrypt(const std::string& config_path);
    ~CRSEncrypt();
public:
    int m_encryptPointCloudXYZI(pcl::PointCloud<pcl::PointXYZI>::Ptr pPointCloud, const std::string& encryptSavePath);

    int m_encryptPointCloudXYZRGB(pcl::PointCloud<pcl::PointXYZRGB>::Ptr pPointCloud, const std::string& encryptSavePath);

    bool m_getIsInitConfig();

    void m_initConfig(const std::string& config_path);

    std::string m_getInitConfigPath();
private:
    bool                m_isInitConfig;
    st_RSRoboDataConfig m_roboDataConfig;
    std::string         m_initConfigPath;
private:
    class CRSSStream;
    class CRSBase64PcdEncrypt;
    class CRSBase64PcdKeyEncrypt;
    class CRSRoboDataManager;
    class CRSRoboDataManagerConfig;
    class CRSPointCloudIO;
};

}

#endif // CRSEncrypt_H
