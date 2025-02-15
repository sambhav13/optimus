// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.2.0
// - protoc             (unknown)
// source: odpf/optimus/core/v1beta1/replay.proto

package optimus

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

// ReplayServiceClient is the client API for ReplayService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type ReplayServiceClient interface {
	Replay(ctx context.Context, in *ReplayRequest, opts ...grpc.CallOption) (*ReplayResponse, error)
}

type replayServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewReplayServiceClient(cc grpc.ClientConnInterface) ReplayServiceClient {
	return &replayServiceClient{cc}
}

func (c *replayServiceClient) Replay(ctx context.Context, in *ReplayRequest, opts ...grpc.CallOption) (*ReplayResponse, error) {
	out := new(ReplayResponse)
	err := c.cc.Invoke(ctx, "/odpf.optimus.core.v1beta1.ReplayService/Replay", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// ReplayServiceServer is the server API for ReplayService service.
// All implementations must embed UnimplementedReplayServiceServer
// for forward compatibility
type ReplayServiceServer interface {
	Replay(context.Context, *ReplayRequest) (*ReplayResponse, error)
	mustEmbedUnimplementedReplayServiceServer()
}

// UnimplementedReplayServiceServer must be embedded to have forward compatible implementations.
type UnimplementedReplayServiceServer struct {
}

func (UnimplementedReplayServiceServer) Replay(context.Context, *ReplayRequest) (*ReplayResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Replay not implemented")
}
func (UnimplementedReplayServiceServer) mustEmbedUnimplementedReplayServiceServer() {}

// UnsafeReplayServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to ReplayServiceServer will
// result in compilation errors.
type UnsafeReplayServiceServer interface {
	mustEmbedUnimplementedReplayServiceServer()
}

func RegisterReplayServiceServer(s grpc.ServiceRegistrar, srv ReplayServiceServer) {
	s.RegisterService(&ReplayService_ServiceDesc, srv)
}

func _ReplayService_Replay_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(ReplayRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ReplayServiceServer).Replay(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/odpf.optimus.core.v1beta1.ReplayService/Replay",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ReplayServiceServer).Replay(ctx, req.(*ReplayRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// ReplayService_ServiceDesc is the grpc.ServiceDesc for ReplayService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var ReplayService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "odpf.optimus.core.v1beta1.ReplayService",
	HandlerType: (*ReplayServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "Replay",
			Handler:    _ReplayService_Replay_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "odpf/optimus/core/v1beta1/replay.proto",
}
