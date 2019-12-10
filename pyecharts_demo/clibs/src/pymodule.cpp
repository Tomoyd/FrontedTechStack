//
// Created by iceory on 3/27/19.
//

#include <boost/python.hpp>
#include <boost/python/suite/indexing/vector_indexing_suite.hpp>
#include <iostream>

#include "pcl_process.h"

namespace robosense
{
    namespace perception
    {
        void helloWorld(int a)
        {
            std::cout << "Hello World!" << a << std::endl;
        }

        BOOST_PYTHON_MODULE (clibs)
        {
            boost::python::class_<std::vector<float> >("FloatVect")
                    .def(boost::python::vector_indexing_suite<std::vector<float> >());

            boost::python::class_<std::vector<std::vector<float> > >("FloatVect2")
                    .def(boost::python::vector_indexing_suite<std::vector<std::vector<float> > >());

            boost::python::def("helloWorld", &helloWorld);
            boost::python::def("pclLoader", &pcl_loader);
            boost::python::def("pclEncrypt", &pcl_entrypt);

        }
    }
}
