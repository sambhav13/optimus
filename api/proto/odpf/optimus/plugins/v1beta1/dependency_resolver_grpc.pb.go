// Code generated by protoc-gen-go-grpc. DO NOT EDIT.

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

// DependencyResolverModServiceClient is the client API for DependencyResolverModService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type DependencyResolverModServiceClient interface {
	// GenerateDestination derive destination from config and assets
	GenerateDestination(ctx context.Context, in *GenerateDestinationRequest, opts ...grpc.CallOption) (*GenerateDestinationResponse, error)
	// GenerateDependencies return names of job destination on which this unit
	// is dependent on
	GenerateDependencies(ctx context.Context, in *GenerateDependenciesRequest, opts ...grpc.CallOption) (*GenerateDependenciesResponse, error)
}

type dependencyResolverModServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewDependencyResolverModServiceClient(cc grpc.ClientConnInterface) DependencyResolverModServiceClient {
	return &dependencyResolverModServiceClient{cc}
}

func (c *dependencyResolverModServiceClient) GenerateDestination(ctx context.Context, in *GenerateDestinationRequest, opts ...grpc.CallOption) (*GenerateDestinationResponse, error) {
	out := new(GenerateDestinationResponse)
	err := c.cc.Invoke(ctx, "/odpf.optimus.plugins.v1beta1.DependencyResolverModService/GenerateDestination", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *dependencyResolverModServiceClient) GenerateDependencies(ctx context.Context, in *GenerateDependenciesRequest, opts ...grpc.CallOption) (*GenerateDependenciesResponse, error) {
	out := new(GenerateDependenciesResponse)
	err := c.cc.Invoke(ctx, "/odpf.optimus.plugins.v1beta1.DependencyResolverModService/GenerateDependencies", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// DependencyResolverModServiceServer is the server API for DependencyResolverModService service.
// All implementations must embed UnimplementedDependencyResolverModServiceServer
// for forward compatibility
type DependencyResolverModServiceServer interface {
	// GenerateDestination derive destination from config and assets
	GenerateDestination(context.Context, *GenerateDestinationRequest) (*GenerateDestinationResponse, error)
	// GenerateDependencies return names of job destination on which this unit
	// is dependent on
	GenerateDependencies(context.Context, *GenerateDependenciesRequest) (*GenerateDependenciesResponse, error)
	mustEmbedUnimplementedDependencyResolverModServiceServer()
}

// UnimplementedDependencyResolverModServiceServer must be embedded to have forward compatible implementations.
type UnimplementedDependencyResolverModServiceServer struct {
}

func (UnimplementedDependencyResolverModServiceServer) GenerateDestination(context.Context, *GenerateDestinationRequest) (*GenerateDestinationResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GenerateDestination not implemented")
}
func (UnimplementedDependencyResolverModServiceServer) GenerateDependencies(context.Context, *GenerateDependenciesRequest) (*GenerateDependenciesResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GenerateDependencies not implemented")
}
func (UnimplementedDependencyResolverModServiceServer) mustEmbedUnimplementedDependencyResolverModServiceServer() {
}

// UnsafeDependencyResolverModServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to DependencyResolverModServiceServer will
// result in compilation errors.
type UnsafeDependencyResolverModServiceServer interface {
	mustEmbedUnimplementedDependencyResolverModServiceServer()
}

func RegisterDependencyResolverModServiceServer(s grpc.ServiceRegistrar, srv DependencyResolverModServiceServer) {
	s.RegisterService(&DependencyResolverModService_ServiceDesc, srv)
}

func _DependencyResolverModService_GenerateDestination_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GenerateDestinationRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(DependencyResolverModServiceServer).GenerateDestination(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/odpf.optimus.plugins.v1beta1.DependencyResolverModService/GenerateDestination",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(DependencyResolverModServiceServer).GenerateDestination(ctx, req.(*GenerateDestinationRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _DependencyResolverModService_GenerateDependencies_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GenerateDependenciesRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(DependencyResolverModServiceServer).GenerateDependencies(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/odpf.optimus.plugins.v1beta1.DependencyResolverModService/GenerateDependencies",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(DependencyResolverModServiceServer).GenerateDependencies(ctx, req.(*GenerateDependenciesRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// DependencyResolverModService_ServiceDesc is the grpc.ServiceDesc for DependencyResolverModService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var DependencyResolverModService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "odpf.optimus.plugins.v1beta1.DependencyResolverModService",
	HandlerType: (*DependencyResolverModServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "GenerateDestination",
			Handler:    _DependencyResolverModService_GenerateDestination_Handler,
		},
		{
			MethodName: "GenerateDependencies",
			Handler:    _DependencyResolverModService_GenerateDependencies_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "odpf/optimus/plugins/v1beta1/dependency_resolver.proto",
}
