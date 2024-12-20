const ServiceRequest = require('../models/service_request');
const User = require('../models/user_model');
const Student = require('../models/student')

exports.createServiceRequest = async (req, res) => {
    try {
        const { userId, type, description } = req.body;
        console.log(req.body)

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const serviceRequest = new ServiceRequest({
            requestedBy: userId,
            type,
            description,
            status: 'pending',
            dateRequested: Date.now()
        });

        await serviceRequest.save();
        res.status(201).json(serviceRequest);
    } catch (err) {
        res.status(500).json({ message: 'Error creating service request', error: err.message, body: req.body });
    }
}

exports.getServiceReqByStudentId = async (req, res)=>{
    try{
        const id = req.params.id
        if(!id) return res.json({message: "ID is not defined"})
        
        const user = await User.findById(id)
        if(!user) return res.status(404).json({message: "Could not find user!"})
        
        const request = await ServiceRequest.find({requestedBy: user._id}).populate("requestedBy")
        if(!request) return res.status(404).json({message: "Could not get services request for this student :", user})
        
        res.status(200).json(request)
    }catch(err){

    }
}

exports.getAllServiceRequests = async (req, res) => {
    try {
        const serviceRequests = await ServiceRequest.find().populate('requestedBy');
        res.status(200).json(serviceRequests);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching service requests', error: err.message });
    }
}


exports.getServiceRequestById = async (req, res) => {
    try {
        const requestId = req.params.id;
        const serviceRequest = await ServiceRequest.findById(requestId).populate('requestedBy');
        if (!serviceRequest) return res.status(404).json({ message: 'Service request not found' });

        res.status(200).json(serviceRequest);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching service request', error: err.message });
    }
}


exports.updateServiceRequestStatus = async (req, res) => {
    try {
        const requestId  = req.params.id;
        if(!requestId) return res.json("ID Field cannot be empty!!!")

        const { status } = req.body;
        if(!status) return res.json("Fields cannot be empty")

        const updatedRequest = await ServiceRequest.findByIdAndUpdate(
            requestId,
            { status },
            { new: true }
        );
        if (!updatedRequest) return res.status(404).json({ message: 'Service request not found' });

        res.status(200).json(updatedRequest);
    } catch (err) {
        res.status(500).json({ message: 'Error updating service request', error: err.message });
    }
}


exports.deleteServiceRequest = async (req, res) => {
    try {
        const requestId = req.params.id;
        if(!requestId) return res.json("ID Field cannot be empty!!!")

        const deletedRequest = await ServiceRequest.findByIdAndDelete(requestId);
        if (!deletedRequest) return res.status(404).json({ message: 'Service request not found' });

        res.status(200).json({ message: 'Service request deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting service request', error: err.message });
    }
}
